"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Semua field harus diisi");
      setSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password minimal 6 karakter");
      setSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password tidak sama");
      setSuccess(false);
      return;
    }

try {

  await axios.post(
    "http://127.0.0.1:8000/api/register",
    {
      name: name,
      email: email,
      password: password
    }
  );

  setMessage("Register berhasil, silakan login");
  setSuccess(true);

  setTimeout(() => {
    router.push("/login");
  }, 1500);

} catch (error) {

  console.log(error.response);

  if (error.response && error.response.data.message) {
    setMessage(error.response.data.message);
  } else {
    setMessage("Register gagal");
  }

  setSuccess(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow">

        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Register
          </h2>

          {message && (
            <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
              {message}
            </div>
          )}

          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-secondary w-full"
            onClick={handleRegister}
          >
            Register
          </button>

          <Link href="/login" className="btn btn-primary w-full">
            Go to Login
          </Link>

          <Link href="/" className="btn btn-ghost w-full">
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}