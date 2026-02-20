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

      <div className="bg-white rounded-2xl shadow divide-y">
        {/* Print out posts */}
        {posts.map(post => (
          <div key={post.id} className="p-4 flex justify-between">
            <span>{post.title}</span>
            <Link
              to={`/posts/${post.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Visa
            </Link>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="p-4 text-gray-500">Inga posts ännu.</p>
        )}
      </div>
    </div>
  );
}