import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/axios";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* Fetch post */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        /* Assign data to state */
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        setError("Kunde inte hämta posten.");
        console.error("Couldn't fetch post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  /* Submit update */
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    /* Check if empty */
    if (!title.trim() || !content.trim()) {
      setError("Du måste fylla i både titel och innehåll");
      return;
    }

    try {
      /* Update post ID */
      await api.put(`/posts/${id}`, { title, content });
      navigate("/admin");
    } catch (error) {
      setError("Kunde inte uppdatera posten.");
      console.error("Error updating post:", error);
    }

    if (loading) {
      return <p>Laddar post...</p>;
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h1 className="text-xl font-bold">Redigera post</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)} placeholder="Titel"
          className="w-full border px-4 py-2 rounded-xl"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)} placeholder="Innehåll"
          className="w-full border px-4 py-2 rounded-xl h-40"
        />
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Spara
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="border px-4 py-2 rounded-xl"
          >
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}
