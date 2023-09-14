"use server";

import { Submission, data, submissions } from "@/lib/data";

import mysql from "mysql2/promise";
import { config } from "@/lib/db";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

export const handleAction = async (answer: string, index: number) => {
  try {
    const question = data.find((q) => q.index === index);
    if (!question) {
      return {
        data: null,
        error: "Cannot find question",
      };
    }

    const conn = await mysql.createConnection(config);
    let [result, resultfields] = await conn.execute(answer);

    return {
      data: {
        result: JSON.stringify(result),
        resultfields: resultfields,
      },
      error: null,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      data: null,
      error: err.message,
    };
  }
};

export const submitAnswer = async (answer: string, index: number) => {
  try {
    const question = data.find((q) => q.index === index);
    if (!question) {
      return {
        ok: false,
        error: "Cannot find question",
      };
    }

    const conn = await mysql.createConnection(config);
    let [result] = await conn.execute(answer);
    let [query] = await conn.execute(question.query);

    let found = await getSubmission(index);

    if (found) {
      return {
        ok: false,
        error: "Already submitted",
      };
    }

    let submissions = await getSubmissions();

    if (!submissions) {
      submissions = [];
    }

    if (JSON.stringify(result) === JSON.stringify(query)) {
      submissions.push({
        answer: answer,
        index: index,
        time: new Date(),
      });
      await writeFile(process.env.FILE!, JSON.stringify(submissions), {
        flag: "w+",
      });
      return {
        ok: false,
        error: null,
      };
    } else {
      return {
        ok: false,
        error: "Wrong Answer, Try again",
      };
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      ok: false,
      error: err.message,
    };
  }
};

export async function getSubmissions() {
  try {
    const file = existsSync(process.env.FILE!);
    if (!file) {
      return null;
    }
    const content = await readFile(process.env.FILE!, { encoding: "utf-8" });
    const submissions: Submission[] = JSON.parse(content);
    return submissions;
  } catch (e) {
    return null;
  }
}

export async function getSubmission(index: number) {
  try {
    const file = existsSync(process.env.FILE!);
    if (!file) {
      return null;
    }
    const content = await readFile(process.env.FILE!, { encoding: "utf-8" });
    const submissions: Submission[] = JSON.parse(content);
    const submission = submissions.find((s) => s.index === index);
    return submission!;
  } catch (e) {
    return null;
  }
}
