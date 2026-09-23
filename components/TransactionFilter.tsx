"use client"

import Cookies from "js-cookie"


interface Props {
  filter: string
  setFilter: (value: string) => void
}


export default function TransactionFilter({
  filter,
  setFilter
}: Props) {


  const filters = [
    "SEMUA",
    "PEMASUKAN",
    "PENGELUARAN",
    "MAKAN",
    "NONGKRONG",
    "AKADEMIK",
    "SKINCARE"
  ]


  function changeFilter(value: string) {

    setFilter(value)

    Cookies.set(
      "transactionFilter",
      value,
      {
        expires: 30
      }
    )

  }



  return (

    <div
      className="
      flex
      gap-3
      flex-wrap
      mb-7
      "
    >

      {
        filters.map((item) => (

          <button

            key={item}

            onClick={() => changeFilter(item)}

            className={`
              px-5
              py-2
              rounded-full
              font-semibold
              transition

              ${
                filter === item

                ?
                "bg-blue-700 text-white"

                :

                "bg-slate-200 text-slate-800 hover:bg-slate-300"

              }
            `}

          >

            {item}

          </button>


        ))
      }


    </div>

  )

}