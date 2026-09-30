"use client";

import { useState } from "react";

type Transaction = {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description: string;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    type: "expense",
    category: "Makan",
    amount: 25000,
    date: "2026-09-23",
    description: "Makan siang",
  },
  {
    id: 2,
    type: "income",
    category: "Uang Saku",
    amount: 500000,
    date: "2026-09-22",
    description: "Uang saku mingguan",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Makan");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setType("expense");
    setCategory("Makan");
    setAmount("");
    setDate("");
    setDescription("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date) {
      alert("Nominal dan tanggal wajib diisi.");
      return;
    }

    if (editingId !== null) {
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === editingId
            ? {
                ...transaction,
                type,
                category,
                amount: Number(amount),
                date,
                description,
              }
            : transaction
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        type,
        category,
        amount: Number(amount),
        date,
        description,
      };

      setTransactions([newTransaction, ...transactions]);
    }

    resetForm();
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setType(transaction.type);
    setCategory(transaction.category);
    setAmount(transaction.amount.toString());
    setDate(transaction.date);
    setDescription(transaction.description);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus transaksi ini?"
    );

    if (!confirmed) return;

    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Transaksi
            </h1>
            <p className="mt-1 text-gray-500">
              Kelola pemasukan dan pengeluaran kamu
            </p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            + Tambah Transaksi
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              {editingId !== null
                ? "Edit Transaksi"
                : "Tambah Transaksi"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Transaksi
                  </label>

                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "income" | "expense")
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  >
                    <option value="expense">Pengeluaran</option>
                    <option value="income">Pemasukan</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kategori
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  >
                    <option value="Makan">Makan</option>
                    <option value="Nongkrong">Nongkrong</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Belanja">Belanja</option>
                    <option value="Uang Saku">Uang Saku</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nominal
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Contoh: 25000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Contoh: Makan siang di kantin"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
                >
                  {editingId !== null
                    ? "Simpan Perubahan"
                    : "Simpan Transaksi"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transaction List */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Riwayat Transaksi
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Jenis</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Nominal</th>
                  <th className="px-6 py-4">Deskripsi</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.date}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type === "income"
                          ? "Pemasukan"
                          : "Pengeluaran"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.category}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Rp {transaction.amount.toLocaleString("id-ID")}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Belum ada transaksi.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}