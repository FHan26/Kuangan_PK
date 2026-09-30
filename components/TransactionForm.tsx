"use client"

import { useState } from "react"

type TransactionFormProps = {
  onSuccess: () => void
  onCancel: () => void
}

export default function TransactionForm({
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const [jenis, setJenis] = useState<"Pemasukan" | "Pengeluaran">(
    "Pengeluaran"
  )
  const [kategori, setKategori] = useState("Makan")
  const [nominal, setNominal] = useState("")
  const [tanggal, setTanggal] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nominal || !tanggal) {
      alert("Nominal dan tanggal wajib diisi.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jenis,
          kategori,
          nominal: Number(nominal),
          tanggal,
          deskripsi,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || "Gagal menambahkan transaksi.")
        return
      }

      alert("Transaksi berhasil ditambahkan.")

      onSuccess()
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan saat menghubungi server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="ttext-2xl font-bold text-slate-900 dark:text-white">
            Tambah Transaksi
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* JENIS */}
          <div>
            <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Jenis Transaksi
            </label>

            <select
              value={jenis}
              onChange={(e) =>
                setJenis(e.target.value as "Pemasukan" | "Pengeluaran")
              }
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Pengeluaran">Pengeluaran</option>
              <option value="Pemasukan">Pemasukan</option>
            </select>
          </div>

          {/* KATEGORI */}
          <div>
            <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Kategori
            </label>

            <input
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              placeholder="Contoh: Makan"
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* NOMINAL */}
          <div>
            <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Nominal
            </label>

            <input
              type="number"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="Contoh: 50000"
              min="1"
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* TANGGAL */}
          <div>
            <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Tanggal
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Deskripsi
            </label>

            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Contoh: Makan siang"
              rows={3}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}