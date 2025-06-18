import { fetchData } from "../api";
import { GET_ALL_USERS, LOGIN, PROFILE, SIGN_UP } from "../api/auth";
import { setToken, setUser } from "../utils/auth";
import { signInFormData, signUpFormData } from "../types/auth";

export const signUp = async (form: signUpFormData) => {
  try {
    const response = await fetchData(SIGN_UP, "POST", form);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const login = async (form: signInFormData) => {
  try {
    const response = await fetchData(LOGIN, "POST", form);
    const loginData = await response.json();
    if (response.ok) {
      setToken(loginData.token);
      setUser(loginData.user_id);
      return true;
    }
    return false;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const profile = async () => {
  try {
    const response = await fetchData(PROFILE, "GET");
    const userData = await response.json();
    if (response.ok) {
      return userData;
    }
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetchData(GET_ALL_USERS, "GET");
    const userData = await response.json();
    if (response.ok) {
      return userData;
    }
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};
