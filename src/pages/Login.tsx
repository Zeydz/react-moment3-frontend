import { useState, type SyntheticEvent } from "react";
import axios from "axios";
import { useAuth } from "../store/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMe, user, setError } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError(null);

    try {
      /* Send credentials */
      await api.post("/auth/login", { username, password });
      await fetchMe();
      /* Navigate to /admin if login is successful */
      navigate("/admin");
    } catch (err: any) {
      console.error("Login request payload:", { username, password });
      if (axios.isAxiosError(err)) {
        console.error("Axios response:", err.response);
        const data = err.response?.data;

        const serverMsg = data?.message ?? data?.error ?? err.message;

        setError(serverMsg);
      } else {
        setError(err?.message ?? String(err));
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Välkommen tillbaka</h1>
          <p className="text-gray-500 text-sm">Logga in för att fortsätta</p>
        </div>

        <div className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 active:scale-[0.99] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
