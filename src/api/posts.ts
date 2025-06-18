import { BASE_URL } from "./index";

export const getPostById = (post_id: string) => `${BASE_URL}/post/${post_id}`;

export const GET_ALL_POSTS = `${BASE_URL}/posts`;

export const getUserPostsById = (user_id: string) =>
  `${BASE_URL}/user-posts/${user_id}`;

export const CREATE_POST = `${BASE_URL}/create-post`;

export const updatePostById = (post_id: string) =>
  `${BASE_URL}/update-post/${post_id}`;

export const deletePostById = (post_id: string) =>
  `${BASE_URL}/post/${post_id}`;
