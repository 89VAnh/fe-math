import { SendIcon } from "@/assets";
import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function ForumPage() {
  return (
    <div className='h-[80vh] rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5 flex flex-col'>
      <div className='bg-gray-1 flex-1'></div>
      <div>
        <Input
          placeholder='Nhập tin nhắn'
          endContent={
            <Button isIconOnly type='button'>
              <SendIcon />
            </Button>
          }
        />
      </div>
    </div>
  );
}
