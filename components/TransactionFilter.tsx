"use client"

import Cookies from "js-cookie"


interface Props {

filter:string

setFilter:(value:string)=>void

}



export default function TransactionFilter({

filter,

setFilter

}:Props){



const filters = [

"SEMUA",
"PEMASUKAN",
"PENGELUARAN",
"MAKAN",
"NONGKRONG",
"AKADEMIK",
"SKINCARE"

]




function changeFilter(value:string){


setFilter(value)


}



return (

<div
className="
flex
gap-3
flex-wrap
mb-5
"
>


{

filters.map((item)=>(


<button


key={item}


onClick={()=>
changeFilter(item)
}



className={`

px-5
py-2
rounded-full
font-semibold


${
filter===item

?

"bg-blue-700 text-white"

:

"bg-gray-200 text-gray-800"

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