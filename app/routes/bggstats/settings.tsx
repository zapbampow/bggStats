import React, { useEffect } from "react";
import { Container } from "~/components/bggStats/pages/layout";
import useManageData from "~/hooks/bgg/useManageData";
import { Transition } from "@headlessui/react";

export default function Settings() {
  const { users, deleteUserData, processing, error } = useManageData();

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  return (
    <div className="w-full lg:w-[764px] px-2 mx-auto">
      <div className="p-8 mb-16 rounded-md markdown bg-slate-100">
        <h1 className="text-[2.5rem] font-bold">Manage your data</h1>
        <p className={`${error ? "mb-4" : "mb-8"}`}>
          Here you can delete unused and unwanted data. <br />
          <br />
          In order to sync data you changed on BGG that had already been
          downloaded for use on this site, you will need to delete the data
          first. Then you can start over.
        </p>

        <ErrorMessage error={error} />

        <ul className="grid grid-cols-3 gap-4">
          {users?.map((user, i) => (
            <li
              key={user.userId}
              className="flex flex-col items-center justify-between p-4 border rounded-md border-slate-800"
            >
              <div>{user.name}</div>
              <div className="mb-4">({user.username})</div>
              <button
                className="px-4 py-2 font-semibold rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800"
                onClick={() => deleteUserData(user.userId)}
                disabled={processing}
              >
                {processing ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ErrorMessage = ({ error }: { error: string | null | undefined }) => {
  return (
    <Transition
      show={error !== null && error !== undefined}
      className="p-2 mb-8 text-white bg-red-400 rounded-md"
      enter="transition-all duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {error}
    </Transition>
  );
};
