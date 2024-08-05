"use client";
import { useGetResult } from "@/helper/data/result.loader";
import { useGetTest } from "@/helper/data/test.loader";
import { Question } from "@/types/Question";
import { Button, Card, Radio, RadioGroup } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import Latex from "react-latex-next";

export default function ResultPage() {
  const { id } = useParams();
  const { data: result } = useGetResult(Number(id));
  const { data: test } = useGetTest(result?.testId);
  const router = useRouter();
  const testSubmit = useMemo(() => {
    if (result) return JSON.parse(result?.testSubmit);
  }, [result]);
  const regex = /<p>(.*?)<\/p>/g;

  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <h2 className='text-2xl font-bold text-center text-green-700 dark:text-green-400'>
        Kết quả : {result?.score}
      </h2>
      <div>
        {test?.questions.map((question: Question, index: number) => (
          <Card
            key={question.id}
            className={`m-4 p-4 bg-green-200 ${
              question.correctAnswer === testSubmit[question.id]
                ? "bg-green-300"
                : "bg-red-300"
            }`}>
            <div className='flex'>
              <b>Câu {index + 1} : </b> <Latex>{question.content.trim()}</Latex>
            </div>
            <div>
              <ul>
                <li
                  key={question.id + " A"}
                  className={
                    question.correctAnswer === "A"
                      ? "text-green-700"
                      : testSubmit[question.id] !== "A"
                      ? ""
                      : "text-red-700"
                  }>
                  <Latex>
                    {question.answerA.replace(regex, (match, p1) => `$${p1}$`)}
                  </Latex>
                </li>
                <li
                  key={question.id + " B"}
                  className={
                    question.correctAnswer === "B"
                      ? "text-green-700"
                      : testSubmit[question.id] !== "B"
                      ? ""
                      : "text-red-700"
                  }>
                  <Latex>
                    {question.answerB.replace(regex, (match, p1) => `$${p1}$`)}
                  </Latex>
                </li>
                <li
                  key={question.id + " C"}
                  className={
                    question.correctAnswer === "C"
                      ? "text-green-700"
                      : testSubmit[question.id] !== "C"
                      ? ""
                      : "text-red-700"
                  }>
                  <Latex>
                    {question.answerC.replace(regex, (match, p1) => `$${p1}$`)}
                  </Latex>
                </li>
                <li
                  key={question.id + " D"}
                  className={
                    question.correctAnswer === "D"
                      ? "text-green-700"
                      : testSubmit[question.id] !== "D"
                      ? ""
                      : "text-red-700"
                  }>
                  <Latex>
                    {question.answerD.replace(regex, (match, p1) => `$${p1}$`)}
                  </Latex>
                </li>
              </ul>
            </div>
          </Card>
        ))}
        <div className='flex justify-center gap-4'>
          <Button onPress={() => router.push("/test/" + result.testId)}>
            Làm lại
          </Button>
          <Button color='primary' onPress={() => router.push("/")}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}
