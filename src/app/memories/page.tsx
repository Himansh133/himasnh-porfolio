import { MemoryBoard } from "@/components/memory-board";
import { memories } from "@/lib/memories";

export const metadata = {
  title: "Memories",
  description: "Photos from Himanshu Kumar's life, each with the song that goes with it.",
};

export default function MemoriesPage() {
  return <MemoryBoard key={memories.map((memory) => memory.id).join(",")} />;
}
