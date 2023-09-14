"use client";
import { Fragment, useState } from "react";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleAction, submitAnswer } from "./server";
import { TestTable } from "./TestTable";
import { TestTableProps } from "./TestTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Submission } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const questionSchema = z.object({
  answer: z.string().min(1, {
    message: "answer is required",
  }),
});

type QuestionProps = {
  index: number;
  submission: Submission | null;
};

function Question({ index, submission }: QuestionProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      answer: submission?.answer ?? "",
    },
  });

  const [result, setResult] = useState<TestTableProps["result"] | null>(null);
  const [resultFields, setResultFields] = useState<
    TestTableProps["resultFields"] | null
  >(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    const { answer } = form.getValues();
    if (answer.length <= 0) {
      return;
    }

    setLoading(true);
    const result = await handleAction(answer, index);
    setLoading(false);
    if (result.data?.result && result.data.resultfields) {
      setResultFields(result.data?.resultfields);
      const parsedResult: TestTableProps["result"] = JSON.parse(
        result.data?.result
      );
      setResult(parsedResult);

      setError("");
    }

    if (result.error) {
      setError(result.error);
    }
  };

  const handleSubmit = async () => {
    const answer = form.getValues().answer;
    if (answer.length === 0) {
      return;
    }
    setLoading(true);
    const data = await submitAnswer(answer, index);
    setLoading(false);
    if (data.ok) {
      window.location.reload();
    } else {
      setError(data.error);
    }
  };

  return (
    <Fragment>
      {/* <Markdown content={question.question} /> */}
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form action={handleTest} className="space-y-8">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={!!submission}
                      placeholder="Enter the answer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button disabled={index === 1 || loading} type="button">
                <Link href={index !== 1 ? `/quiz/${index - 1}` : "/quiz/1"}>
                  Prev
                </Link>
              </Button>
              <Button
                disabled={loading || !!submission}
                variant="outline"
                type="submit"
              >
                Test
              </Button>
              <Button
                formAction={handleSubmit}
                disabled={loading || !!submission}
                variant="secondary"
                type="submit"
              >
                Submit
              </Button>
              <Button asChild disabled={index === 9 || loading} type="button">
                <Link href={index !== 9 ? `/quiz/${index + 1}` : "/summary"}>
                  Next
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {error?.length > 0 && (
        <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {error?.length === 0 && result && resultFields && (
        <TestTable result={result} resultFields={resultFields} />
      )}
    </Fragment>
  );
}

export default Question;
