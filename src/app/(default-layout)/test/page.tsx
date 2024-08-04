"use client";
import Search from "@/components/Search";
import { useSearchTest } from "@/helper/data/test.loader";
import { Test } from "@/types/Test";
import { BASE_URL } from "@/utils/config";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const PAGE_SIZE = 10;
  const router = useRouter();

  const {
    data,
    isLoading,
    mutate: searchMutate,
  } = useSearchTest({
    page,
    pageSize: PAGE_SIZE,
    searchContent,
  });
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Search
        handleSearch={(formData) =>
          setSearchContent(formData.get("search")?.toString() || "")
        }
      />
      <div className='gap-2 grid grid-cols-2 sm:grid-cols-4 my-4'>
        {data?.data.map((item: Test, index: number) => (
          <Card
            shadow='sm'
            key={index}
            isPressable
            onPress={() => router.push("/test/" + item.id)}>
            <CardBody className='overflow-visible p-0'>
              <Image
                shadow='sm'
                radius='none'
                width='100%'
                alt={item.id}
                className='w-full object-cover h-[140px]'
                src={item.image}
              />
            </CardBody>
            <CardFooter className='flex-col items-start text-start'>
              <div>
                <b>{item.id}</b>
              </div>
              <div>
                <b>{item.title}</b>
              </div>
              <div>
                <p>{item.level}</p>
              </div>
              <div className='flex justify-between w-full'>
                <p>{item.questions.length} câu hỏi</p>
                <p>{item.duration} phút</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
