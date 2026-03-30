"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
export default function CreatePost() {

    useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  }

}, []);

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCreate = async () => {

    if (!title || !content) {
      setMessage("Semua field harus diisi");
      setSuccess(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/posts",
        {
          title: title,
          content: content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Post berhasil dibuat");
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {

      console.log(error.response);
      setMessage("Gagal membuat post");
      setSuccess(false);

    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">

      <div className="card w-96 bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Create Post
          </h2>

          {message && (
            <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
              {message}
            </div>
          )}

          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="btn btn-primary w-full"
            onClick={handleCreate}
          >
            Save Post
          </button>

          <button
            className="btn btn-ghost w-full"
            onClick={() => router.push("/dashboard")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}