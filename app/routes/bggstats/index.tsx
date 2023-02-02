import React from "react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import UsernameForm from "~/components/bggStats/forms/UsernameForm";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const username = body.get("username");
  return redirect(`${username}`);
}

export default function BGGStatsHome() {
  return (
    <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
      <h1 className="mb-8 text-6xl font-semibold text-center text-slate-100">
        BGG Play Stats
      </h1>
      <UsernameForm />
    </div>
  );
}
