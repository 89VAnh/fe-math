"use client";
import Search from "@/components/Search";
import { useSearchLevel } from "@/helper/data/level.loader";
import { useSearchTest } from "@/helper/data/test.loader";
import { Level } from "@/types/Level";
import { Test } from "@/types/Test";
import { BASE_URL } from "@/utils/config";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const PAGE_SIZE = 10;
  const router = useRouter();
  const [level, setLevel] = useState<Key>();

  const { data: levels } = useSearchLevel({});
  const { data, isLoading } = useSearchTest({
    page,
    pageSize: PAGE_SIZE,
    searchContent,
    level,
  });
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      {levels?.data && (
        <Tabs
          aria-label='Tabs radius'
          classNames={{
            base: "w-full my-4",
            tabList: "w-full",
          }}
          onSelectionChange={(key: Key) => setLevel(key)}>
          {levels?.data.map((level: Level) => (
            <Tab key={level?.id} title={level?.name} />
          ))}
        </Tabs>
      )}
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
