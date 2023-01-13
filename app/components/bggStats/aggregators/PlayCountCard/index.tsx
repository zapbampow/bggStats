import PlayCountCard from "./PlayCountCard";
import { PlayCountCardProvider } from "./PlayCountCardContext";

type Props = { userId: number };

export default function index({ userId }: Props) {
  return (
    <PlayCountCardProvider>
      <PlayCountCard userId={userId} />
    </PlayCountCardProvider>
  );
}
