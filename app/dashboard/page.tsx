"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import TransactionFilter from "@/components/TransactionFilter"
import TransactionPreference from "@/components/TransactionPreference"
import ThemeToggle from "@/components/ThemeToggle"
import BudgetSummary from "@/components/BudgetSummary"
import TransactionForm from "@/components/TransactionForm"

type Transaction = {
  id: number
  tanggal: string
  kategori: string
  jenis: string
  nominal: number
  deskripsi: string | null
}

export default function DashboardPage() {
  const [filter, setFilter] = useState("SEMUA")
  const [limit, setLimit] = useState(5)
  const [order, setOrder] = useState("terbaru")
  const [theme, setTheme] = useState("light")
  const [budget, setBudget] = useState(0)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  // BACA COOKIE PREFERENSI SAAT HALAMAN DIBUKA
  useEffect(() => {
    const savedLimit = Cookies.get("transactionLimit")
    const savedFilter = Cookies.get("transactionFilter")
    const savedOrder = Cookies.get("transactionOrder")
    const savedTheme = Cookies.get("theme")
    const savedBudget = Cookies.get("budget")

    if (savedLimit) setLimit(Number(savedLimit))
    if (savedFilter) setFilter(savedFilter)
    if (savedOrder) setOrder(savedOrder)
    if (savedBudget) setBudget(Number(savedBudget))

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // belum ada cookie: ikuti tema sistem
      setTheme("dark")
    }
  }, [])

  // AMBIL TRANSAKSI DARI API
  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transactions")

      if (!response.ok) {
        throw new Error("Gagal mengambil transaksi")
      }

      const data = await response.json()

      const formattedTransactions: Transaction[] = data.map(
        (item: {
          id: number
          tanggal: string
          kategori: string
          jenis: string
          nominal: string | number
          deskripsi: string | null
        }) => ({
          id: item.id,
          tanggal: item.tanggal,
          kategori: item.kategori,
          jenis: item.jenis,
          nominal: Number(item.nominal),
          deskripsi: item.deskripsi,
        })
      )

      setTransactions(formattedTransactions)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTransactions(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // TERAPKAN TEMA KE <html> SETIAP TEMA BERUBAH
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  // SIMPAN COOKIE SAAT PREFERENSI DIUBAH
  function changeLimit(value: number) {
    setLimit(value)
    Cookies.set("transactionLimit", String(value), { expires: 30 })
  }

  function changeFilter(value: string) {
    setFilter(value)
    Cookies.set("transactionFilter", value, { expires: 30 })
  }

  function changeOrder(value: string) {
    setOrder(value)
    Cookies.set("transactionOrder", value, { expires: 30 })
  }

  function changeBudget(value: number) {
    setBudget(value)
    Cookies.set("budget", String(value), { expires: 30 })
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    Cookies.set("theme", next, { expires: 30 })
  }

  // URUTKAN (berdasarkan tanggal) + FILTER TRANSAKSI
  const sortedTransactions = [...transactions].sort((a, b) => {
    const diff = new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    return order === "terbaru" ? diff : -diff
  })

  const filteredTransactions = sortedTransactions
    .filter((item) => {
      if (filter === "SEMUA") return true
      if (filter === "PEMASUKAN") return item.jenis === "Pemasukan"
      if (filter === "PENGELUARAN") return item.jenis === "Pengeluaran"
      return item.kategori.toUpperCase() === filter
    })
    .slice(0, limit)

  // HITUNG TOTAL
  const income = transactions
    .filter((item) => item.jenis === "Pemasukan")
    .reduce((sum, item) => sum + item.nominal, 0)

  const expense = transactions
    .filter((item) => item.jenis === "Pengeluaran")
    .reduce((sum, item) => sum + item.nominal, 0)

  const balance = income - expense

  return (
    <>
      {showTransactionForm && (
        <TransactionForm
          onSuccess={async () => {
            await fetchTransactions()
            setShowTransactionForm(false)
          }}
          onCancel={() => setShowTransactionForm(false)}
        />
      )}

      <main className="min-h-screen bg-slate-100 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-extrabold">Kuangan 💸</h1>
            <p className="mt-2 text-slate-600 text-lg dark:text-slate-400">
              Halo Adel 👋, selamat datang kembali di dashboard keuangan Anda.
            </p>
          </div>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* SUMMARY CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SALDO */}
          <div className="bg-blue-700 text-white rounded-2xl p-7 shadow-xl dark:bg-blue-800">
            <p className="text-blue-100">Saldo Saat Ini</p>
            <h2 className="text-4xl font-bold mt-3">
              Rp {balance.toLocaleString("id-ID")}
            </h2>
          </div>

          {/* PEMASUKAN */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border-l-8 border-green-500 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Total Pemasukan</p>
            <h2 className="text-3xl font-bold text-green-600 mt-3 dark:text-green-400">
              Rp {income.toLocaleString("id-ID")}
            </h2>
            <span className="inline-block mt-4 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold dark:bg-green-900/40 dark:text-green-300">
              ↑ Pemasukan
            </span>
          </div>

          {/* PENGELUARAN */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border-l-8 border-red-500 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Total Pengeluaran</p>
            <h2 className="text-3xl font-bold text-red-600 mt-3 dark:text-red-400">
              Rp {expense.toLocaleString("id-ID")}
            </h2>
            <span className="inline-block mt-4 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold dark:bg-red-900/40 dark:text-red-300">
              ↓ Pengeluaran
            </span>
          </div>
        </div>

        {/* RINGKASAN ANGGARAN (FR-12) */}
        <BudgetSummary
          budget={budget}
          expense={expense}
          setBudget={changeBudget}
        />

        {/* RIWAYAT TRANSAKSI */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-7 dark:bg-slate-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
            <button
              onClick={() => setShowTransactionForm(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl font-semibold"
            >
              + Tambah Transaksi
            </button>
          </div>

          {/* PREFERENSI (COOKIES) */}
          <TransactionPreference
            limit={limit}
            setLimit={changeLimit}
            order={order}
            setOrder={changeOrder}
          />

          {/* FILTER */}
          <TransactionFilter filter={filter} setFilter={changeFilter} />

          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                  <th className="text-left py-4">Tanggal</th>
                  <th className="text-left">Kategori</th>
                  <th className="text-left">Jenis</th>
                  <th className="text-right">Jumlah</th>
                </tr>
              </thead>

              <tbody>
                {loadingTransactions && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 dark:text-slate-400">
                      Memuat transaksi...
                    </td>
                  </tr>
                )}

                {!loadingTransactions && filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 dark:text-slate-400">
                      Belum ada transaksi.
                    </td>
                  </tr>
                )}

                {filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <td className="py-4">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium dark:bg-blue-900/40 dark:text-blue-300">
                        {item.kategori}
                      </span>
                    </td>

                    <td>
                      {item.jenis === "Pemasukan" ? (
                        <span className="text-green-600 font-bold dark:text-green-400">
                          + Pemasukan
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold dark:text-red-400">
                          - Pengeluaran
                        </span>
                      )}
                    </td>

                    <td className="text-right font-bold">
                      <span
                        className={
                          item.jenis === "Pemasukan"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        Rp {item.nominal.toLocaleString("id-ID")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}