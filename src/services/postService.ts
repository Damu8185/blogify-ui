import { fetchData } from "../api";
import {
  CREATE_POST,
  deletePostById,
  GET_ALL_POSTS,
  getPostById,
  getUserPostsById,
  updatePostById,
} from "../api/posts";

export const fetchPostById = async (post_id: string) => {
  try {
    const response = await fetchData(getPostById(post_id), "GET");
    const posts = await response.json();
    console.log("posts", posts);

    return posts;
  } catch (error) {
    console.error("error", error);
    // setErrorToast("Something went wrong. Please try again.");
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetchData(GET_ALL_POSTS, "GET");
    const posts = await response.json();
    if (response.ok) {
      return posts;
    }
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const getUserPosts = async (user_id: string) => {
  try {
    const response = await fetchData(getUserPostsById(user_id), "GET");
    const posts = await response.json();
    if (response.ok) {
      return posts;
    }
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const createPost = async (form) => {
  try {
    const response = await fetchData(CREATE_POST, "POST", form);
    const createdPostData = await response.json();

    if (response.ok) {
      return createdPostData;
    }
    return response;
  } catch (error) {
    console.error("error", error);
    return error;
  }
};

export const updatePost = async (form) => {
  try {
    const response = await fetchData(updatePostById(form._id), "PATCH", form);
    const updatedPostData = await response.json();

    if (response.ok) {
      return updatedPostData;
    }
    return response;
  } catch (error) {
    console.error("error", error);
    return error;
  }
};

export const deletePost = async (post_id: string) => {
  const response = await fetchData(deletePostById(post_id), "DELETE");
  return response;
};
