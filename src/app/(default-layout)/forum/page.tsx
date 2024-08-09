"use client";
import { SendIcon } from "@/assets";
import { useCreateChat, useSearchChat } from "@/helper/data/chat.loader";
import { getUser } from "@/lib/account.action";
import { Account } from "@/types/Account";
import { Chat } from "@/types/Chat";
import { formatDate } from "@/utils";
import { Button, Image, Input, ScrollShadow } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

export default function ForumPage() {
  const [user, setUser] = useState<Account>({} as Account);
  const { trigger } = useCreateChat();
  const { data, mutate } = useSearchChat({
    page: 1,
    pageSize: 100,
  });
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className='h-[80vh] rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5 flex flex-col'>
      <div className='flex justify-center mb-4'>
        <h2 className='text-6xl text-primary font-bold'>Diễn đàn</h2>
      </div>
      <div className='bg-gray-1 flex-1 flex flex-col overflow-scroll'>
        <div className='overflow-scroll'>
          {data?.data &&
            data?.data.reverse().map((chat: any) => (
              <div
                className={`flex my-4 gap-2 ${
                  chat.user === user.name ? "flex-row-reverse" : ""
                }`}
                key={chat.id}>
                {chat.avatar && (
                  <Image
                    src={chat.avatar}
                    width={40}
                    height={40}
                    alt={chat.user}
                  />
                )}{" "}
                <div>
                  <div
                    className={`text-xs text-gray-500 ${
                      chat.user === user.name ? "text-end" : ""
                    }`}>
                    {chat.user}
                  </div>
                  <div className='bg-gray-6 rounded-lg p-3 text-white'>
                    {chat.content}
                    <div className='text-xs text-primary-foreground/80 mt-1'>
                      {formatDate(chat.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        className='bg-gray-1'
        action={async (formData: FormData) => {
          if (formData.get("message") !== "") {
            const payload = {
              user: user.username,
              content: formData.get("message"),
            };

            trigger(payload).then((data) => {
              mutate();
              setInputValue("");
            });
          }
        }}>
        <Input
          className='rounded-t-none bg-red-50'
          placeholder='Nhập tin nhắn'
          name='message'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          endContent={
            <Button isIconOnly type='submit'>
              <SendIcon />
            </Button>
          }
        />
      </form>
    </div>
  );
}
