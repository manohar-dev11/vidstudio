"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-800 p-8">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <input name="email" type="email" placeholder="Email" required
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 outline-none" />
        <input name="password" type="password" placeholder="Password" required
          className="w-full rounded-lg bg-zinc-900 px-4 py-3 outline-none" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button disabled={loading}
          className="w-full rounded-lg bg-white py-3 font-semibold text-black disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}