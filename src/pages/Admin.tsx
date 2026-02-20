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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin</h1>

        <Link
          to="/admin/create"
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition"
        >
          Ny post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border divide-y">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 flex items-center justify-between"
          >
            {/* Left side */}
            <div>
              <h2 className="font-medium text-gray-800">{post.title}</h2>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                to={`/posts/${post.id}`}
                className="text-sm px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                Visa
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                Ta bort
              </button>
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
