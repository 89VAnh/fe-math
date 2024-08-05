"use client";
import { ClockIcon } from "@/assets";
import { useGetTest, useSubmitTest } from "@/helper/data/test.loader";
import { getUser } from "@/lib/account.action";
import { Account } from "@/types/Account";
import { Question } from "@/types/Question";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
  user,
} from "@nextui-org/react";
import "katex/dist/katex.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import Latex from "react-latex-next";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: test } = useGetTest(id);
  const {
    isOpen: isSubmitOpen,
    onOpen: onSubmitOpen,
    onOpenChange: onSubmitOpenChange,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onOpenChange: onErrorOpenChange,
  } = useDisclosure();
  const [data, setData] = useState<FormData>();
  const [user, setUser] = useState<Account>({} as Account);
  const [startTime, setStartTime] = useState<Date>();
  const [timerEnd, setTimerEnd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });

    setStartTime(new Date());
  }, []);

  const { trigger, isMutating } = useSubmitTest();
  const handleSubmit = (data: FormData | undefined) => {
    if (data) {
      const payload: any = {};
      const questions: Question[] = test?.questions;
      questions?.forEach((question: Question) => {
        payload[question.id] = data.get(question.id.toString());
      });
      trigger({
        testId: test?.id,
        user: user?.username,
        startTime: startTime,
        endTime: new Date(),
        testSubmit: payload,
      }).then((res) => {
        router.push("/result/" + res.id);
      });
    }
  };

  const btnSubmitRef = useRef<HTMLButtonElement>(null);
  const regex = /<p>(.*?)<\/p>/g;
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <div className='flex justify-between'>
        <div>
          <h2>
            <b> Mã đề : {id}</b>
          </h2>
          <b> {test?.title}</b>
        </div>
        <div className='flex items-center gap-4'>
          <ClockIcon />

          {test?.duration && (
            <Countdown
              date={Date.now() + test?.duration * 60 * 1000}
              renderer={({ minutes, seconds }) => (
                <span>
                  {minutes}:{seconds}
                </span>
              )}
              onComplete={() => {
                btnSubmitRef.current?.click();
                setTimerEnd(true);
              }}
            />
          )}
        </div>
      </div>
      <form
        action={(data) => {
          if (timerEnd) handleSubmit(data);
          else {
            setData(data);
            if (Array.from(data)?.length < test?.questions.length)
              onErrorOpen();
            else onSubmitOpen();
          }
        }}>
        {test?.questions.map((question: Question, index: number) => (
          <div key={question.id}>
            <div className='flex my-4'>
              <b>Câu {index + 1} : </b>{" "}
              <Latex>
                {question.content.replace(regex, (match, p1) => `$${p1}$`)}
              </Latex>
            </div>
            <div>
              <RadioGroup name={question.id.toString()} isRequired={true}>
                <Radio value='A'>
                  <Latex>
                    {question.answerA.replace(regex, (match, p1) => `$${p1}$`)}
                  </Latex>
                </Radio>
                <Radio value='B'>
                  <Latex>
                    ${question.answerB.replace(regex, (match, p1) => `$${p1}$`)}
                    $
                  </Latex>
                </Radio>
                <Radio value='C'>
                  <Latex>
                    ${question.answerC.replace(regex, (match, p1) => `$${p1}$`)}
                    $
                  </Latex>
                </Radio>
                <Radio value='D'>
                  <Latex>
                    ${question.answerD.replace(regex, (match, p1) => `$${p1}$`)}
                    $
                  </Latex>
                </Radio>
              </RadioGroup>
            </div>
          </div>
        ))}
        <div className='flex justify-center'>
          {/* <Button color='primary' type='submit'>
            Nộp bài
          </Button> */}
          <Button color='primary' type='submit' ref={btnSubmitRef}>
            Nộp bài
          </Button>
        </div>
      </form>
      <Modal
        isOpen={isSubmitOpen}
        onOpenChange={onSubmitOpenChange}
        placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Xác nhận nộp bài
              </ModalHeader>
              <ModalBody>Bạn có chắc chắn muốn nộp bài?</ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Huỷ
                </Button>
                <Button
                  color='primary'
                  isLoading={isMutating}
                  onPress={() => {
                    handleSubmit(data);
                    onClose();
                  }}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isErrorOpen}
        onOpenChange={onErrorOpenChange}
        placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Cảnh báo
              </ModalHeader>
              <ModalBody>
                Bạn phải hoàn thiện tất cả các câu hỏi trước khi nộp bài, vui
                lòng kiểm tra lại!
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onPress={() => {
                    onClose();
                  }}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
