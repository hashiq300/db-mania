import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

import Question from "./Question";
import { data, submissions } from "@/lib/data";
import { TestTable } from "./TestTable";
import { getSubmission } from "./server";

type PageProps = {
  params: {
    code: string;
  };
};

export default async function QuizPage({ params }: PageProps) {
  const index = parseInt(params.code);
  if (Number.isNaN(index) || !(index >= 1 && index <= 9)) {
    redirect("/");
  }
  const question = data.find((q) => q.index === index);
  const submission = await getSubmission(index);
  return (
    <main className="flex-1">
      <div className="mt-12 max-w-xl mx-auto">{question?.content}</div>
      <div className="mt-4 mx-auto">
        <Question index={index} submission={submission} />
      </div>
    </main>
  );
}
