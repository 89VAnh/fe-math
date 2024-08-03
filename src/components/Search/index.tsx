import { SearchIcon } from "@/assets";
import React, { useState } from "react";

const Search = ({
  placeholder = "Tìm kiếm",
  handleSearch,
}: {
  placeholder?: string;
  handleSearch: (formData: FormData) => void;
}) => {
  return (
    <>
      <form action={handleSearch}>
        <div className='relative w-full max-w-[400px]'>
          <button className='absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary'>
            <SearchIcon />
          </button>

          <input
            name='search'
            type='text'
            placeholder={placeholder}
            className='w-full rounded-full border border-stroke bg-gray-2 py-2 pl-12 pr-3 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[400px]'
          />
        </div>
      </form>
    </>
  );
};

export default Search;
