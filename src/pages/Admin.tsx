import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
}

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    fetchPosts();
  }, []);

  /* Delete specific post */
  const handleDelete = async (id: number) => {
    if (!confirm("Vill du ta bort posten?")) {
      return;
    }

    try {
      await api.delete(`/posts/${id}`);

      // Ta bort från state direkt (snabb UI)
      setPosts((posts) => posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold">Admin</h1>

        <Link
          to="/admin/create"
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition text-center"
        >
          Ny post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border divide-y">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            {/* Left side */}
            <div className="min-w-0">
              <h2 className="font-medium text-gray-800 break-words">
                {post.title}
              </h2>
            </div>

            {/* Right side */}
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Link
                to={`/posts/${post.id}`}
                className="text-sm px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                Visa
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
              >
                Ta bort
              </button>
              <Link
                to={`/admin/posts/${post.id}/edit`}
                className="text-sm text-yellow-600 bg-yellow-50 hover:bg-yellow-100 transition px-3 py-1 rounded-lg"
              >
                Redigera
              </Link>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="p-6 text-center text-gray-500">Inga posts ännu.</div>
        )}
      </div>
    </div>
  );
}