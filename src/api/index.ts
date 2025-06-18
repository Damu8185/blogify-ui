import { getToken } from "../utils/auth";

export const fetchData = (URL: string, method: string, body?) => {
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
