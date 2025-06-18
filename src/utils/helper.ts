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

export const profileName = (name: string) => {
  const names = name.trim().split(" ");
  const first = names[0]?.charAt(0).toUpperCase() || "";
  const last =
    names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
  return first + last;
};
