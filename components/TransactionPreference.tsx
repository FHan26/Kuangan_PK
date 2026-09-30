"use client"

interface Props {
  limit: number
  setLimit: (value: number) => void
  order: string
  setOrder: (value: string) => void
}

const selectClass =
  "border border-slate-300 rounded-lg px-4 py-2 bg-white text-gray-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"

export default function TransactionPreference({
  limit,
  setLimit,
  order,
  setOrder,
}: Props) {
  return (
    <div className="bg-gray-50 border border-slate-200 rounded-xl p-4 mb-6 dark:bg-slate-800 dark:border-slate-700">
      <p className="font-semibold text-gray-800 mb-3 dark:text-slate-100">
        Preferensi Tampilan Transaksi
      </p>

      <div className="flex gap-4 flex-wrap">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className={selectClass}
        >
          <option value={5}>5 transaksi</option>
          <option value={10}>10 transaksi</option>
          <option value={20}>20 transaksi</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className={selectClass}
        >
          <option value="terbaru">Terbaru dulu</option>
          <option value="terlama">Terlama dulu</option>
        </select>
      </div>
    </div>
  )
}