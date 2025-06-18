import { BASE_URL } from "../utils/auth";

export const getPostById = (post_id: number) => `${BASE_URL}/post/${post_id}`;

export const GET_ALL_POSTS = `${BASE_URL}/posts`;

export const getUserPostsById = (user_id: number) =>
  `${BASE_URL}/user-posts/${user_id}`;
