import { BASE_URL } from "./index";

export const LOGIN = `${BASE_URL}/sign-in`;

export const SIGN_UP = `${BASE_URL}/sign-up`;

export const PROFILE = (userId: string) => `${BASE_URL}/user/${userId}`;

export const GET_ALL_USERS = `${BASE_URL}/users`;
