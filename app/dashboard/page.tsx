import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-4">Selamat datang, {session.user.name}</p>

        <p className="text-gray-600">{session.user.email}</p>

        <form action="/api/auth/logout" method="POST" className="mt-6">
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}
