"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {

  if (!email || !password) {
    setMessage("Email dan Password harus diisi");
    setSuccess(false);
    return;
  }

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/api/login",
      {
        email: email,
        password: password
      }
    );

    const token = response.data.token;

    localStorage.setItem("token", token);

    setMessage("Login berhasil");
    setSuccess(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

  } catch (error) {

    setMessage("Login gagal");
    setSuccess(false);

  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Login
          </h2>

          {message && (
            <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-full"
            onClick={handleLogin}
          >
            Login
          </button>

          <Link href="/register" className="btn btn-secondary w-full">
            Go to Register
          </Link>

          <Link href="/" className="btn btn-ghost w-full">
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}