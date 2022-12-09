import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

type Props = {
  percentDone: number;
  error: string | null;
  userFirstTime: boolean;
};
export default function DownloadProgress({
  percentDone,
  error,
  userFirstTime,
}: Props) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const verb = userFirstTime ? "Downloading" : "Updating";
  const percent = parseFloat(percentDone.toFixed(2));

  useEffect(() => {
    if (percentDone < 100 && !error) {
      setShow(true);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (percentDone === 100) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    }

    if (error) {
      setErrorMessage(
        `Something went wrong ${verb.toLowerCase()} your play data. Reload the page to try again.`
      );
      timeout = setTimeout(() => {
        setShow(false);
      }, 10000);
      return;
    }

    return () => clearTimeout(timeout);
  }, [percentDone, error, verb]);

  return (
    <Transition
      show={show}
      appear={true}
      enter="transition-transform duration-300 ease-linear"
      enterFrom="-translate-y-32"
      enterTo="translate-y-0"
      leave="transition-transform duration-300 ease-linear"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-32"
      className={
        "absolute flex items-center justify-center p-4 text-white -translate-x-1/2 bg-black rounded-md bg-opacity-70 top-4 left-1/2 w-content"
      }
    >
      {errorMessage
        ? errorMessage
        : `${verb} your play data. ${percent}% done.`}
    </Transition>
  );
}
