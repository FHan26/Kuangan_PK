"use client"

import { useState } from "react"

interface Props {
  budget: number
  expense: number
  setBudget: (value: number) => void
}

export default function BudgetSummary({ budget, expense, setBudget }: Props) {
  const [input, setInput] = useState("")

  const remaining = budget - expense
  const percent = budget > 0 ? Math.min((expense / budget) * 100, 100) : 0
  const isOver = budget > 0 && expense > budget

  const barColor = isOver
    ? "bg-red-500"
    : percent >= 75
    ? "bg-yellow-500"
    : "bg-green-500"

  function handleSave() {
    const value = Number(input)
    if (!value || value <= 0) return
    setBudget(value)
    setInput("")
  }

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-7 dark:bg-slate-900">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Ringkasan Anggaran</h2>

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Atur anggaran (Rp)"
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-gray-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl font-semibold"
          >
            Simpan anggaran
          </button>
        </div>
      </div>

      {budget > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Anggaran</p>
              <p className="text-2xl font-bold mt-1">
                Rp {budget.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400">Total Pengeluaran</p>
              <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                Rp {expense.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400">Sisa Anggaran</p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  isOver
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {isOver ? "- " : ""}Rp {Math.abs(remaining).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-4 rounded-full ${barColor}`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {isOver
                ? `Pengeluaran melebihi anggaran sebesar Rp ${Math.abs(
                    remaining
                  ).toLocaleString("id-ID")}.`
                : `${Math.round(percent)}% anggaran sudah terpakai.`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-slate-600 dark:text-slate-400">
          Anggaran belum diatur. Isi nominal di atas lalu klik Simpan anggaran.
        </p>
      )}
    </div>
  )
}