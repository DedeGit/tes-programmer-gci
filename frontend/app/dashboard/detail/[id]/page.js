"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function DetailPost() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [post, setPost] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchPost();

  }, []);

  const fetchPost = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPost(response.data);

    } catch (error) {

      console.log(error.response);

    }
  };

  if (!post) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-10">

      <div className="card bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-2xl font-bold">
            Detail Post
          </h2>

          <p className="text-lg font-semibold">
            Title:
          </p>
          <p>{post.title}</p>

          <p className="text-lg font-semibold mt-4">
            Content:
          </p>
          <p>{post.content}</p>

          <p className="text-lg font-semibold mt-4">
            Author:
          </p>
          <p>{post.user?.name}</p>

          <button
            className="btn btn-primary mt-5"
            onClick={() => router.push("/dashboard")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}