import LoginForm from "@/components/Auth/LoginForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Login Page | Math",
  description: "Math Login Page",
};

const SignIn: React.FC = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center bg-[url(https://i.pinimg.com/originals/86/bf/f8/86bff8d975bf29ee90cdd6fab518d4be.jpg)]'>
      <div className='rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card'>
        <div className='flex flex-wrap items-center'>
          <div className='w-full xl:w-1/2'>
            <div className='w-full p-4 sm:p-12.5 xl:p-15'>
              <LoginForm />
            </div>
          </div>

          <div className='hidden w-full p-7.5 xl:block xl:w-1/2'>
            <div className='custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none'>
              <Link className='mb-10 inline-block' href='/'>
                <Image
                  className='hidden dark:block'
                  // src={"/images/logo/logo.svg"}
                  src={"/images/logo/Logo Web.svg"}
                  alt='Logo'
                  width={176}
                  height={32}
                />
                <Image
                  className='dark:hidden'
                  // src={"/images/logo/logo-dark.svg"}
                  src={"/images/logo/Logo Web.svg"}
                  alt='Logo'
                  width={176}
                  height={32}
                />
              </Link>
              <p className='mb-3 text-xl font-medium text-dark dark:text-white'>
                Đăng nhập vào tài khoản của bạn
              </p>

              <h1 className='mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3'>
                Trắc nghiệm toán trực tuyến
              </h1>

              <p className='w-full max-w-[600px] font-medium text-dark-4 dark:text-dark-6'>
                Vui lòng điền đầy đủ thông tin vào các trường để đăng nhập
              </p>

              <div className='mt-31'>
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt='Logo'
                  width={405}
                  height={325}
                  className='mx-auto dark:opacity-30'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
