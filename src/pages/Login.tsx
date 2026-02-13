import { useState, type SyntheticEvent } from "react";
import axios from "axios";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, fetchMe } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/login", { username, password });
      await fetchMe();
      navigate("/");
    } catch (err: any) {
      console.error("Login request payload:", { username, password });
      if (axios.isAxiosError(err)) {
        console.error("Axios response:", err.response);
        const serverMsg = err.response?.data?.message ?? err.response?.data ?? err.message;
        setError(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
      } else {
        setError(err?.message ?? String(err));
        console.error("Login error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        placeholder="password"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

