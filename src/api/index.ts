import { getToken } from "../utils/helper";

export const BASE_URL =
  import.meta.env.API_BASE_URL ?? "http://localhost:4000/api";

export const fetchData = (URL: string, method: string, body?: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  return fetch(URL, {
    method: method ?? "GET",
    headers,
    ...(body ? { body: JSON.stringify(body) } : null),
  });
};
