import { DownArrowIcon, LogoutIcon, SettingIcon, UserIcon } from "@/assets";
import { getUser, logout } from "@/lib/account.action";
import { Account } from "@/types/Account";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClickOutside from "../ClickOutside";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<Account>({} as Account);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-4'
        href='#'>
        <span className='h-12 w-12 rounded-full'>
          <Image
            width={112}
            height={112}
            src={user.avatar}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt='User'
            className='overflow-hidden rounded-full'
          />
        </span>

        <span className='flex items-center gap-2 font-medium text-dark dark:text-dark-6'>
          <span className='hidden lg:block'>{user.name}</span>

          <DownArrowIcon
            className={`duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
          />
        </span>
      </Link>

      {/* <!-- Dropdown Star --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark z-20`}>
          <div className='flex items-center gap-2.5 px-5 pb-5.5 pt-3.5'>
            <span className='relative block h-12 w-12 rounded-full'>
              <Image
                width={112}
                height={112}
                src={user.avatar}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                alt='User'
                className='overflow-hidden rounded-full'
              />

              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark'></span>
            </span>

            <span className='block'>
              <span className='block font-medium text-dark dark:text-white'>
                {user.name}
              </span>
              <span className='block font-medium text-dark-5 dark:text-dark-6'>
                {user.email}
              </span>
            </span>
          </div>
          <ul className='flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3'>
            <li>
              <Link
                href='/profile'
                className='flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base'>
                <UserIcon />
                View profile
              </Link>
            </li>

            <li>
              <Link
                href='/pages/settings'
                className='flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base'>
                <SettingIcon />
                Account Settings
              </Link>
            </li>
          </ul>
          <div className='p-2.5'>
            <button
              className='flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base'
              onClick={() => logout()}>
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
