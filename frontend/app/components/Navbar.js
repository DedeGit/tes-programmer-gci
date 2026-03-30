import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">

      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          GCI Dashboard
        </Link>
      </div>

      <div className="flex-none gap-2">

        <Link href="/login" className="btn btn-primary">
          Login
        </Link>

        <Link href="/register" className="btn btn-secondary">
          Register
        </Link>

      </div>

    </div>
  );
}