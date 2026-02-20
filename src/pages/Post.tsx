import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Post() {
  /* Get the ID from URL */
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* Fetch the POST with the given ID */
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Laddar post...</p>;
  }
  if (!post) {
    return <p>Posten hittades inte.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
      <div className="text-center mt-6">
        <a href="/" className="text-blue-600 hover:text-blue-800 transition">Tillbaka till hem</a>
      </div>
    </div>

  );
}
