const storagePrefix = "MATH_";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN;
export const ERROR_TIMEOUT = "read ETIMEDOUT";
export const ERROR_MANY = "Too many connections";

export const USER_COOKIE = storagePrefix + "user";
export const SESSION_TOKEN = storagePrefix + "session_token";

export const SEARCH_PAGE = "page";
export const SEARCH_SIZE = "size";
export const SEARCH_CONTENT = "s";
export const SEARCH_FROM_DATE = "fr";
export const SEARCH_TO_DATE = "to";
