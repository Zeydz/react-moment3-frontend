import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/* Configuration for Axios */
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* Public user type */
export interface User {
  id?: number;
  username: string;
}

/* Interface for Post */
export interface Post {
  id: number;
  title: string;
  content: string;
}

/* Get posts and return data */
export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data } = await api.get<Post[]>("/posts");
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/* Get current user and return data */
export const me = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<any>("/me");

    const payload = data?.user ?? data;

    if (!payload) {
      return null;
    }

    const user: User = {
      id: payload.id,
      username: payload.username,
    };

    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If unauthorized, return null (not authenticated)
      if (error.response?.status === 401) return null;
    }
    console.error("Error fetching user:", error);
    throw error;
  }
};

/* Logout - ask server to clear session cookie */
export const logoutRequest = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
