export const BASE_URL =
  import.meta.env.API_BASE_URL ?? "http://localhost:4000/api";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setUser = (id: string) => {
  localStorage.setItem("user_id", id);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): string | null => {
  return localStorage.getItem("user_id");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
};

export const requireAuth = (): string => {
  const token = getToken();
  if (!token) throw new Response("Unauthorized", { status: 401 });
  return token;
};

export const createPost = (title: string, description: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  return fetch(`${BASE_URL}/create-post`, {
    method: "POST",
    headers,
    body: JSON.stringify({ post_title: title, description }),
  });
};

export const updatePost = (
  postId: string,
  description: string,
  title: string
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  return fetch(`${BASE_URL}/update-post/${postId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ description, post_title: title }),
  });
};

export const deletePost = (postId: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  return fetch(`${BASE_URL}/post/${postId}`, {
    method: "DELETE",
    headers,
  });
};
