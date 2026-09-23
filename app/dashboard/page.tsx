export default function DashboardPage() {
  const transactions = [
    {
      date: "23 Sep 2026",
      category: "Makan",
      type: "Pengeluaran",
      amount: "Rp 75.000",
    },
    {
      date: "22 Sep 2026",
      category: "Akademik",
      type: "Pengeluaran",
      amount: "Rp 500.000",
    },
    {
      date: "20 Sep 2026",
      category: "Internship",
      type: "Pemasukan",
      amount: "Rp 2.500.000",
    },
    {
      date: "18 Sep 2026",
      category: "Skincare",
      type: "Pengeluaran",
      amount: "Rp 750.000",
    },
  ];


  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Kuangan 💸
        </h1>

        <p className="text-gray-600 mt-2">
          Halo Adel 👋, selamat datang kembali.
          Berikut ringkasan kondisi keuangan Anda.
        </p>

      </div>



      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {/* Saldo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">

          <p className="text-blue-100">
            Total Saldo
          </p>

          <h2 className="text-3xl font-bold mt-3">
            Rp 1.000.000.000
          </h2>

          <p className="text-sm mt-3 text-blue-100">
            Periode September 2026
          </p>

        </div>



        {/* Income */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">

          <p className="text-gray-500">
            Total Pemasukan
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-3">
            Rp 100.000.000
          </h2>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            ↑ Income
          </span>

        </div>




        {/* Expense */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">

          <p className="text-gray-500">
            Total Pengeluaran
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-3">
            Rp 5.000.000
          </h2>


          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
            ↓ Expense
          </span>


        </div>


      </div>





      {/* Transaction History */}
      <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">


        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </h2>


          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Tambah Transaksi
          </button>


        </div>



        <div className="overflow-x-auto">

        <table className="w-full">


          <thead>

            <tr className="border-b text-gray-500">

              <th className="text-left py-3">
                Tanggal
              </th>

              <th className="text-left">
                Kategori
              </th>

              <th className="text-left">
                Jenis
              </th>

              <th className="text-right">
                Jumlah
              </th>


            </tr>

          </thead>




          <tbody>

          {transactions.map((item,index)=>(

            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-4">
                {item.date}
              </td>


              <td>

                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {item.category}
                </span>

              </td>


              <td>

                {
                  item.type === "Pemasukan" ? (

                    <span className="text-green-600 font-semibold">
                      + {item.type}
                    </span>

                  ) : (

                    <span className="text-red-600 font-semibold">
                      - {item.type}
                    </span>

                  )
                }

              </td>


              <td className="text-right font-semibold">

                {
                  item.type === "Pemasukan" ? (

                    <span className="text-green-600">
                      {item.amount}
                    </span>

                  ) : (

                    <span className="text-red-600">
                      {item.amount}
                    </span>

                  )
                }


              </td>


            </tr>

          ))}


          </tbody>


        </table>

        </div>


      </div>



    </main>
  );
}