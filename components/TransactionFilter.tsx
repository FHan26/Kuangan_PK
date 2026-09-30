"use client"

interface Props {
  filter: string
  setFilter: (value: string) => void
}

const filters = [
  "SEMUA",
  "PEMASUKAN",
  "PENGELUARAN",
  "MAKAN",
  "NONGKRONG",
  "AKADEMIK",
  "SKINCARE",
]

export default function TransactionFilter({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-3 flex-wrap mb-5">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`px-5 py-2 rounded-full font-semibold ${
            filter === item
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}