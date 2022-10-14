import { useState, useEffect } from "react";
import { useParams } from "remix";
import { getUserInfo } from "~/services/bggService";
import type { UserInfo } from "~/models/bgg/userInfo";
import { db } from "../../services/db";

export function useBggUser() {
  const { username } = useParams();
  const [user, setUser] = useState<UserInfo | undefined>();

  const handleUserName = async (username: string) => {
    const dbUserInfo = await db.users
      .where("username")
      .equals(username)
      .first();

    // only hit the bgg api to get user if a user with that username doesn't already exist
    if (dbUserInfo) {
      setUser(dbUserInfo);
    } else {
      const userInfo = await getUserInfo(username);
      console.log("userInfo", userInfo);

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

  return user;
}

const addUserToIndexDB = async (userInfo: UserInfo) => {
  try {
    return await db.users.add(userInfo);
  } catch (err) {
    console.log(err);
  }
};
