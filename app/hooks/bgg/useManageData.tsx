import { useState, useEffect } from "react";
import { getUsers, deleteUserAndPlaysByUserId } from "~/services/idbService";

type User = {
  userId: number;
  username: string;
  name: string;
};

export default function useManageData() {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const deleteUserData = async (id: number) => {
    setProcessing(true);
    try {
      const deleted = await deleteUserAndPlaysByUserId(id);

      const updatedUsers = users?.filter((user) => user.userId !== id);

      setUsers(updatedUsers);
      setProcessing(false);
      return `Deleted ${deleted.playsDeleted} plays`;
    } catch (err) {
      setError(err);
      setProcessing(false);
      throw new Error(err);
    }
  };

  useEffect(function getAndSetUsers() {
    getUsers()
      .then((res) => {
        const mappedUsers: User[] = res.map((user) => ({
          userId: user.userId,
          username: user.username,
          name: user.name,
        }));
        setUsers(mappedUsers);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return { users, deleteUserData, error, processing, setError };
}
