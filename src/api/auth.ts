import { BASE_URL } from "../utils/auth";

export const LOGIN = `${BASE_URL}/sign-in`;

export const SIGN_UP = `${BASE_URL}/sign-up`;

export const PROFILE = (userId: number) => `${BASE_URL}/user/${userId}`;

export const GET_ALL_USERS = `${BASE_URL}/users`;
