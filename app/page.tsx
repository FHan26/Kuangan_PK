import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>

        <p className="mt-2 text-gray-600">
          Kelola pengeluaran Anda dengan mudah.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded border border-blue-600 px-4 py-2 text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
