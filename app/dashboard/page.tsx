"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import TransactionFilter from "@/components/TransactionFilter"


export default function DashboardPage() {


  const transactions = [

    {
      date:"23 Sep 2026",
      category:"Makan",
      type:"Pengeluaran",
      amount:75000
    },

    {
      date:"22 Sep 2026",
      category:"Akademik",
      type:"Pengeluaran",
      amount:500000
    },


    {
      date:"20 Sep 2026",
      category:"Freelance",
      type:"Pemasukan",
      amount:2500000
    },


    {
      date:"18 Sep 2026",
      category:"Skincare",
      type:"Pengeluaran",
      amount:750000
    }

  ]



  const [filter,setFilter] = useState("SEMUA")



  // Ambil cookie
  useEffect(()=>{

    const saved =
      Cookies.get(
        "transactionFilter"
      )


    if(saved){
      setFilter(saved)
    }

  },[])





  const filteredTransactions =
  transactions.filter((item)=>{


    if(filter==="SEMUA"){
      return true
    }


    if(filter==="PEMASUKAN"){
      return item.type==="Pemasukan"
    }


    if(filter==="PENGELUARAN"){
      return item.type==="Pengeluaran"
    }


    return item.category.toUpperCase()===filter


  })





  const income =
  transactions
  .filter(
    item=>item.type==="Pemasukan"
  )
  .reduce(
    (sum,item)=>sum+item.amount,
    0
  )



  const expense =
  transactions
  .filter(
    item=>item.type==="Pengeluaran"
  )
  .reduce(
    (sum,item)=>sum+item.amount,
    0
  )




return (

<main
className="
min-h-screen
bg-slate-100
p-8
text-slate-900
"
>



<h1
className="
text-4xl
font-extrabold
mb-2
"
>
Kuangan 💸
</h1>


<p
className="
text-slate-600
mb-8
"
>
Halo Adel 👋, selamat datang kembali
</p>





<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
>



<div
className="
bg-blue-700
text-white
rounded-2xl
p-7
shadow-xl
"
>

<p>
Total Saldo
</p>


<h2
className="
text-4xl
font-bold
mt-3
"
>
Rp 10.000.000
</h2>

</div>







<div
className="
bg-white
rounded-2xl
p-7
shadow-lg
border-l-8
border-green-500
"
>

<p className="text-gray-500">
Total Pemasukan
</p>


<h2
className="
text-3xl
font-bold
text-green-600
mt-3
"
>
Rp {income.toLocaleString("id-ID")}
</h2>


</div>








<div
className="
bg-white
rounded-2xl
p-7
shadow-lg
border-l-8
border-red-500
"
>

<p className="text-gray-500">
Total Pengeluaran
</p>


<h2
className="
text-3xl
font-bold
text-red-600
mt-3
"
>
Rp {expense.toLocaleString("id-ID")}
</h2>


</div>




</div>







<div
className="
mt-10
bg-white
rounded-2xl
shadow-xl
p-7
"
>


<h2
className="
text-2xl
font-bold
mb-5
"
>
Riwayat Transaksi
</h2>




<TransactionFilter

filter={filter}

setFilter={setFilter}

/>







<table
className="
w-full
"
>


<thead>

<tr
className="
border-b
text-slate-700
"
>


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


{
filteredTransactions.map(
(item,index)=>(


<tr
key={index}
className="
border-b
hover:bg-slate-50
"
>


<td className="py-4">
{item.date}
</td>


<td>

<span
className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
"
>
{item.category}
</span>

</td>



<td>

{
item.type==="Pemasukan"

?

<span className="text-green-600 font-bold">
+ Pemasukan
</span>

:

<span className="text-red-600 font-bold">
- Pengeluaran
</span>

}

</td>



<td
className="
text-right
font-bold
"
>

Rp {item.amount.toLocaleString("id-ID")}

</td>


</tr>


))


}


</tbody>


</table>


</div>


</main>


)

}