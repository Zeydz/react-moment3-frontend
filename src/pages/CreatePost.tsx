import { useState, type SyntheticEvent } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    /* Validation check */
    if (!title.trim() || !content.trim()) {
      setError("Du måste fylla i både titel och innehåll");
      return;
    }

    try {
      /* POST to posts-endpoint */
      await api.post("/posts", { title, content });
      navigate("/admin");
    } catch (err) {
      setError("Kunde inte skapa inlägg");
      console.error("Failed to create post", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h1 className="text-xl font-bold">Skapa post</h1>
        {/* Title input */}
        <input
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
          placeholder="Titel"
          className="w-full border px-4 py-2 rounded-xl"
        />

        {/* Content input */}
        <textarea
          value={content}
          onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)}
          placeholder="Innehåll"
          className="w-full border px-4 py-2 rounded-xl h-40"
        />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Publicera
        </button>
      </form>
    </div>
  );
}
