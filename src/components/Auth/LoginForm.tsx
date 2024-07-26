"use client";
import { PasswordIcon, UserIcon } from "@/assets";
import { loginFetcher } from "@/helper/fetcher/account.fetcher";
import { login } from "@/lib/account.action";
import { Checkbox } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function LoginForm() {
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  } | null>(null);

  const { error } = useSWR(account, loginFetcher, {
    onSuccess: (data) => {
      if (data !== null) login(data);
    },
  });

  const hadleLogin = (formData: FormData) => {
    const payload = {
      username: formData.get("username")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    setAccount(payload);
  };

  return (
    <form action={hadleLogin}>
      <div className='mb-4'>
        <label
          htmlFor='username'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Tên đăng nhập
        </label>
        <div className='relative'>
          <input
            placeholder='Nhập tên đăng nhập'
            name='username'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <UserIcon />
          </span>
        </div>
      </div>

      <div className='mb-5'>
        <label
          htmlFor='password'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Mật khẩu
        </label>
        <div className='relative'>
          <input
            type='password'
            name='password'
            placeholder='Nhập mật khẩu'
            autoComplete='password'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <PasswordIcon />
          </span>
        </div>
      </div>

      {error && (
        <div className='mb-4'>
          <p className='text-red-600'>{error?.response?.data?.message}</p>
        </div>
      )}

      <div className='mb-6 flex items-center justify-between gap-2 py-2'>
        <Checkbox>Ghi nhớ đăng nhập</Checkbox>

        <Link
          href='/auth/forgot-password'
          className='select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary'>
          Quên mật khẩu?
        </Link>
      </div>

      <div className='mb-4.5'>
        <button
          type='submit'
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90'>
          Đăng nhập
        </button>
      </div>

      <div>
        <Link
          href='/signin'
          className='select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary'
          replace>
          Tạo tài khoản mới
        </Link>
      </div>
    </form>
  );
}
