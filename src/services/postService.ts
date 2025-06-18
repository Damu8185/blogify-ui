import { fetchData } from "../api";
import { GET_ALL_POSTS, getPostById, getUserPostsById } from "../api/posts";

export const fetchPostById = async (post_id: number) => {
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

export const getUserPosts = async (user_id: number) => {
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
