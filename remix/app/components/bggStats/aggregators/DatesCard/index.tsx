import DatesCard from "./DatesCard";
import { DatesCardProvider, useDatesCardContext } from "./DatesCardContext";

import React from "react";

type Props = {
  userId: number;
};
export default function index({ userId }: Props) {
  return (
    <DatesCardProvider>
      <DatesCard userId={userId} />
    </DatesCardProvider>
  );
}
