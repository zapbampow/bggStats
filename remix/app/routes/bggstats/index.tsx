import React from "react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const username = body.get("username");
  return redirect(`bggStats/${username}`);
}

export default function BGGStatsHome() {
  return (
    <div className="absolute text-3xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Form method="post" className="flex gap-4">
        <input
          className="px-4 py-2 rounded-md bg-slate-100"
          name="username"
          type="text"
          placeholder="BGG Username"
        />
        <button
          className="px-4 py-2 font-semibold rounded-md bg-slate-100"
          type="submit"
        >
          <span className="text-gradient">Submit</span>
        </button>
      </Form>
    </div>
  );
}
