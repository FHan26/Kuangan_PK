"use client"

interface Props {
  theme: string
  toggleTheme: () => void
}

export default function ThemeToggle({ theme, toggleTheme }: Props) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Ganti tema"
      className="px-4 py-2 rounded-xl font-semibold border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      {theme === "dark" ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
    </button>
  )
}