import React from "react";
import { Outlet } from "@remix-run/react";
import { Container } from "~/components/bggStats/pages/layout";

export default function tools() {
  return (
    <Container>
      {/* <ToolSelector /> */}
      <Outlet />
    </Container>
  );
}
