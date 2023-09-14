import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex-1 mt-24 flex justify-center items-center">
      <Button asChild>
        <Link href="/quiz/1">Go to quiz</Link>
      </Button>
    </div>
  );
}
