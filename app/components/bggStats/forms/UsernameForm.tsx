import { Form } from "@remix-run/react";

export default function UsernameForm() {
  return (
    <Form method="post" className="flex flex-col gap-4 md:flex-row">
      <input
        className="px-4 py-2 rounded-md bg-slate-100"
        name="username"
        type="text"
        placeholder="BGG Username"
      />
      <button
        className="px-4 py-2 text-3xl font-semibold rounded-md bg-slate-100"
        type="submit"
      >
        <span className="text-gradient">Submit</span>
      </button>
    </Form>
  );
}
