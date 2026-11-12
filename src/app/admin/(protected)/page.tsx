import { Suspense } from "react";
import { connection } from "next/server";
import { auth, signOut } from "@/auth";

async function Dashboard() {
  await connection();
  const session = await auth();

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-zinc-400">Signed in as {session?.user?.email}</p>

      <form
        className="mt-8"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <button className="rounded-full border border-zinc-700 px-6 py-2">Sign out</button>
      </form>
    </main>
  );
}

export default function AdminHome() {
  return (
    <Suspense fallback={<p className="p-8 text-zinc-400">Loading...</p>}>
      <Dashboard />
    </Suspense>
  );
}