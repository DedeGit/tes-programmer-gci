"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditPost() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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

      setTitle(response.data.title);
      setContent(response.data.content);

    } catch (error) {

      console.log(error.response);

    }
  };

  const handleUpdate = async () => {

    if (!title || !content) {
      setMessage("Semua field harus diisi");
      setSuccess(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/posts/${id}`,
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

      setMessage("Post berhasil diupdate");
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {

      console.log(error.response);

      if (error.response?.status === 403) {
        setMessage("Tidak boleh edit post orang lain");
      } else {
        setMessage("Gagal update post");
      }

      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">

      <div className="card w-96 bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Edit Post
          </h2>

          {message && (
            <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
              {message}
            </div>
          )}

          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="btn btn-warning w-full"
            onClick={handleUpdate}
          >
            Update Post
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