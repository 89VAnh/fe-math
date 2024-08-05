"use client";
import { SendIcon } from "@/assets";
import { useCreateChat, useSearchChat } from "@/helper/data/chat.loader";
import { getUser } from "@/lib/account.action";
import { Account } from "@/types/Account";
import { Chat } from "@/types/Chat";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function ForumPage() {
  const [user, setUser] = useState<Account>({} as Account);
  const { trigger } = useCreateChat();
  const { data, mutate } = useSearchChat({
    page: 1,
    pageSize: 100,
  });
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className='h-[80vh] rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5 flex flex-col'>
      <div className='bg-gray-1 flex-1 flex flex-col justify-end'>
        <div className='flex flex-col justify-end'>
          {data?.data &&
            data?.data.map((chat: Chat) => (
              <span key={chat.id}>
                {chat.user} : {chat.content}
              </span>
            ))}
        </div>
      </div>
      <form
        className='bg-gray-1'
        action={async (formData: FormData) => {
          console.log(formData);
          const payload = {
            user: user.username,
            content: formData.get("message"),
          };

          trigger(payload).then((data) => {
            console.log(data);
            mutate();
          });
        }}>
        <Input
          className='rounded-t-none bg-red-50'
          placeholder='Nhập tin nhắn'
          name='message'
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
