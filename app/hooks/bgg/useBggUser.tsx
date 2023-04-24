import { useState, useEffect } from "react";
import { useParams } from "@remix-run/react";
import { getUserInfo } from "~/services/bggService";
import type { UserInfo } from "~/models/bgg/userInfo";
import { db } from "~/services/db";

export function useBggUser() {
  const { username } = useParams();
  const [user, setUser] = useState<UserInfo | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleUserName = async (username: string) => {
    setError(undefined);

    const dbUserInfo = await db.users
      .where("username")
      .equals(username)
      .first();

    // only hit the bgg api to get user if a user with that username doesn't already exist
    if (dbUserInfo) {
      setUser(dbUserInfo);
    } else {
      const userInfo = await getUserInfo(username);

      let isARealUser = isValidUser(userInfo);

      if (!isARealUser) {
        setError(
          `"${username}" doesn't seem to be a valid user. Please check your spelling and try again.`
        );
      }

      if (userInfo) {
        setUser(userInfo);
        addUserToIndexDB(userInfo);
      }
    }
  };

  useEffect(() => {
    if (username) {
      handleUserName(username);
    } else {
      setUser(undefined);
    }
  }, [username]);

  return { user, error };
}

const addUserToIndexDB = async (userInfo: UserInfo) => {
  try {
    return await db.users.add(userInfo);
  } catch (err) {
    console.log(err);
  }
};

const isValidUser = (userInfo: UserInfo) => {
  console.log("userInfo", userInfo);
  const {
    avatarLink,
    country,
    name,
    stateOrProvince,
    userId,
    username,
    yearRegistered,
  } = userInfo;
  const isValidStringVal = (item: string) =>
    item !== "N/A" && item.trim().length > 0;
  const isValidNumVal = (item: number) => !isNaN(item);

  return (
    isValidStringVal(avatarLink) ||
    isValidStringVal(country) ||
    isValidStringVal(name) ||
    isValidStringVal(stateOrProvince) ||
    isValidNumVal(userId) ||
    isValidStringVal(username) ||
    isValidNumVal(yearRegistered)
  );
};
