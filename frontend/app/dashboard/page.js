"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchPosts(1);

  }, []);

  const fetchPosts = async (page = 1) => {

  const token = localStorage.getItem("token");

  try {

    const response = await axios.get(
      `http://127.0.0.1:8000/api/posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPosts(response.data.data);
    setCurrentPage(response.data.current_page);
    setLastPage(response.data.last_page);

  } catch (error) {

    console.log(error.response);

  }
};

  const handleLogout = async () => {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    localStorage.removeItem("token");
    router.push("/login");
  };
  
const handleDelete = async (id) => {

  const confirmDelete = confirm("Yakin ingin menghapus post?");

  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {

    await axios.delete(
      `http://127.0.0.1:8000/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Post berhasil dihapus");

    fetchPosts(currentPage);

  } catch (error) {

    console.log(error.response);

    if (error.response?.status === 403) {
      alert("Tidak boleh hapus post orang lain");
    } else {
      alert("Gagal menghapus post");
    }

  }
};
  return (
    <div className="min-h-screen bg-base-200">

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow">

        <div className="flex-1 ml-4">
          <h1 className="text-xl font-bold">
            Dashboard Admin
          </h1>
        </div>

        <div className="mr-4">
          <button
            className="btn btn-error"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>

      {/* Content */}
      <div className="p-10">

<button
  className="btn btn-primary mb-5"
  onClick={() => router.push("/dashboard/create")}
>
  Create Post
</button>

        <div className="overflow-x-auto">

          <table className="table bg-base-100">

            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {Array.isArray(posts) && posts.map((post, index) => (
                <tr key={post.id}>

                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>

                  <td className="space-x-2">

<button
  className="btn btn-info btn-sm"
  onClick={() => router.push(`/dashboard/detail/${post.id}`)}
>
  Detail
</button>

<button
  className="btn btn-warning btn-sm"
  onClick={() => router.push(`/dashboard/edit/${post.id}`)}
>
  Edit
</button>

<button
  className="btn btn-error btn-sm"
  onClick={() => handleDelete(post.id)}
>
  Delete
</button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
<div className="flex justify-center gap-2 mt-5">

  <button
    className="btn btn-sm"
    disabled={currentPage === 1}
    onClick={() => fetchPosts(currentPage - 1)}
  >
    Prev
  </button>

  <span className="btn btn-sm btn-active">
    {currentPage}
  </span>

  <button
    className="btn btn-sm"
    disabled={currentPage === lastPage}
    onClick={() => fetchPosts(currentPage + 1)}
  >
    Next
  </button>

</div>
        </div>

      </div>

    </div>
  );
}