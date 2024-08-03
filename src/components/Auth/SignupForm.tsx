"use client";
import {
  EmailIcon,
  NameIcon,
  PasswordIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets";
import { useRegister } from "@/helper/data/account.loader";
import { signup } from "@/lib/account.action";
import { LOGIN_URL } from "@/routes";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignupForm() {
  const [error, setError] = useState<any>("");
  const { trigger, error: signupError, isMutating } = useRegister();

  useEffect(() => {
    setError(signupError?.response?.data?.message);
  }, [signupError]);

  const hadleSignup = (formData: FormData) => {
    const data = Object.fromEntries(formData);

    if (data.password === data.repassword) {
      delete data.repassword;
      trigger(data).then((data) => {
        if (data) signup();
      });
    } else {
      setError("Mật khẩu không khớp");
    }
  };

  return (
    <form action={hadleSignup}>
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

      <div className='mb-5'>
        <label
          htmlFor='repassword'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Nhập lại mật khẩu
        </label>
        <div className='relative'>
          <input
            type='password'
            name='repassword'
            placeholder='Nhập lại mật khẩu'
            autoComplete='password'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <PasswordIcon />
          </span>
        </div>
      </div>

      <div className='mb-5'>
        <label
          htmlFor='name'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Tên
        </label>
        <div className='relative'>
          <input
            name='name'
            placeholder='Nhập tên'
            autoComplete='name'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <NameIcon />
          </span>
        </div>
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Email
        </label>
        <div className='relative'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <EmailIcon />
          </span>
        </div>
      </div>
      <div className='mb-5'>
        <label
          htmlFor='phone'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Số điện thoại
        </label>
        <div className='relative'>
          <input
            name='phone'
            placeholder='Nhập số điện thoại'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />
          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <PhoneIcon />
          </span>
        </div>
      </div>

      {error && (
        <div className='mb-4'>
          <p className='text-red-600'>{error}</p>
        </div>
      )}

      <div className='mb-4.5'>
        <Button
          isLoading={isMutating}
          type='submit'
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90'>
          Đăng ký
        </Button>
      </div>

      <div>
        <Link
          href={LOGIN_URL}
          className='select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary'
          replace>
          Bạn đã có tài khoản
        </Link>
      </div>
    </form>
  );
}
