import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

/* */
interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  /* Fetch posts when component loads */
  useEffect(() => {
    fetchPosts();
  }, []);

  /* Fetch posts */
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Laddar posts...</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Senaste inläggen</h1>

      {posts.length === 0 && <p>Inga posts ännu.</p>}

    {/* Print out blog-posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-600 line-clamp-2">{post.content}</p>

          <Link
            to={`/posts/${post.id}`}
            className="text-blue-600 text-sm hover:underline"
          >
            Läs mer
          </Link>
        </div>
      ))}
    </div>
  );
}
