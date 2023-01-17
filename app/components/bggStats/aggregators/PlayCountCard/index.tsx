import PlayCountCard from "./PlayCountCard";
import { PlayCountCardProvider } from "./PlayCountCardContext";
import { DatesCardProvider } from "../DatesCard/DatesCardContext";

type Props = { userId: number };

export default function index({ userId }: Props) {
  return (
    <DatesCardProvider>
      <PlayCountCard userId={userId} />
    </DatesCardProvider>
  );
}
