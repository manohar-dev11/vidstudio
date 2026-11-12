import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function Guard({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await auth();
  if (!session) redirect("/admin/login");
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-8 text-zinc-400">Loading...</p>}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}