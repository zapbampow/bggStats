import DatesCard from "./DatesCard";
import { DatesCardProvider } from "./DatesCardContext";

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
