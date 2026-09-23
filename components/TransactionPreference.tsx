"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"



export default function TransactionPreference(){


const [limit,setLimit] = useState("5")



useEffect(()=>{


const saved =
Cookies.get("transactionLimit")


if(saved){

setLimit(saved)

}


},[])





function changeLimit(value:string){


setLimit(value)


Cookies.set(

"transactionLimit",

value,

{

expires:30

}

)


}




return (

<div

className="
bg-gray-50
border
rounded-xl
p-4
mb-6
"

>


<p
className="
font-semibold
text-gray-800
mb-2
"
>
Preferensi Tampilan Transaksi
</p>



<select


value={limit}


onChange={(e)=>
changeLimit(e.target.value)
}



className="
border
rounded-lg
px-4
py-2
text-gray-800
"

>


<option value="5">
5 transaksi
</option>


<option value="10">
10 transaksi
</option>


<option value="20">
20 transaksi
</option>



</select>


</div>


)


}