"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import TransactionFilter from "@/components/TransactionFilter"
import TransactionPreference from "@/components/TransactionPreference"



export default function DashboardPage(){


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
},


{
date:"15 Sep 2026",
category:"Nongkrong",
type:"Pengeluaran",
amount:150000
},


{
date:"10 Sep 2026",
category:"Bonus",
type:"Pemasukan",
amount:1000000
}

]





const [filter,setFilter] = useState("SEMUA")


const [limit,setLimit] = useState(5)





// COOKIE PREFERENSI JUMLAH TRANSAKSI

useEffect(()=>{


const savedLimit =
Cookies.get("transactionLimit")



if(savedLimit){

setLimit(
Number(savedLimit)
)

}


},[])








// FILTER TRANSAKSI


const filteredTransactions =


transactions


.filter((item)=>{


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



.slice(0,limit)










// HITUNG TOTAL


const income =

transactions

.filter(
item=>item.type==="Pemasukan"
)

.reduce(

(sum,item)=>
sum+item.amount,

0

)







const expense =

transactions

.filter(
item=>item.type==="Pengeluaran"
)

.reduce(

(sum,item)=>
sum+item.amount,

0

)









const balance =

income-expense










return (

<main

className="
min-h-screen
bg-slate-100
p-8
text-slate-900
"

>


{/* HEADER */}


<div

className="
mb-8
"

>


<h1

className="
text-4xl
font-extrabold
"

>

Kuangan 💸

</h1>




<p

className="
mt-2
text-slate-600
text-lg
"

>

Halo Adel 👋, selamat datang kembali di dashboard keuangan Anda.

</p>


</div>









{/* SUMMARY CARD */}


<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"

>






{/* SALDO */}

<div

className="
bg-blue-700
text-white
rounded-2xl
p-7
shadow-xl
"

>


<p
className="
text-blue-100
"

>
Saldo Saat Ini
</p>



<h2

className="
text-4xl
font-bold
mt-3
"

>

Rp {balance.toLocaleString("id-ID")}

</h2>



</div>









{/* PEMASUKAN */}


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


<p

className="
text-slate-500
"

>
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



<span

className="
inline-block
mt-4
px-4
py-2
rounded-full
bg-green-100
text-green-700
font-semibold
"

>

↑ Pemasukan

</span>



</div>









{/* PENGELUARAN */}



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


<p

className="
text-slate-500
"

>

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



<span

className="
inline-block
mt-4
px-4
py-2
rounded-full
bg-red-100
text-red-700
font-semibold
"

>

↓ Pengeluaran

</span>



</div>





</div>









{/* RIWAYAT TRANSAKSI */}


<div

className="
mt-10
bg-white
rounded-2xl
shadow-xl
p-7
"

>



<div

className="
flex
justify-between
items-center
mb-6
"

>


<h2

className="
text-2xl
font-bold
"

>

Riwayat Transaksi

</h2>



<button

className="
bg-blue-700
hover:bg-blue-800
text-white
px-5
py-2
rounded-xl
font-semibold
"

>

+ Tambah Transaksi

</button>



</div>









{/* COOKIE PREFERENCE */}


<TransactionPreference />









{/* FILTER */}


<TransactionFilter

filter={filter}

setFilter={setFilter}

/>









{/* TABLE */}


<div

className="
overflow-x-auto
"

>


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


<th

className="
text-left
py-4
"

>
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


<td

className="
py-4
"

>

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
font-medium
"

>

{item.category}

</span>



</td>








<td>


{

item.type==="Pemasukan"


?


<span

className="
text-green-600
font-bold
"

>

+ Pemasukan

</span>



:


<span

className="
text-red-600
font-bold
"

>

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


<span

className={

item.type==="Pemasukan"

?

"text-green-600"

:

"text-red-600"

}

>


Rp {item.amount.toLocaleString("id-ID")}


</span>



</td>






</tr>


)


)


}



</tbody>




</table>


</div>





</div>







</main>

)


}