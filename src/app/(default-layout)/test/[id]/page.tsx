"use client";
import { useGetTest } from "@/helper/data/test.loader";
import { Question } from "@/types/Question";
import { Radio, RadioGroup } from "@nextui-org/react";
import Latex from "react-latex-next";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: test } = useGetTest(id);
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <div>
        <h2>
          <b> Mã đề : {id}</b>
        </h2>
        <b> {test?.title}</b>
      </div>

      {test?.questions.map((question: Question, index: number) => (
        <div key={question.id}>
          <div className='flex my-4'>
            <b>Câu {index + 1} : </b> <Latex>{question.content.trim()}</Latex>
          </div>
          <div>
            <RadioGroup>
              <Radio value='A'>
                <Latex> {question.answerA}</Latex>
              </Radio>
              <Radio value='B'>
                <Latex>{question.answerB}</Latex>
              </Radio>
              <Radio value='C'>
                <Latex>{question.answerC}</Latex>
              </Radio>
              <Radio value='D'>
                <Latex>{question.answerD}</Latex>
              </Radio>
            </RadioGroup>
          </div>
        </div>
      ))}
    </div>
  );
}
