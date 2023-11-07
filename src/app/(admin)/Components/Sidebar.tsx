'use client'

import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Sidebar(){
    const router = useRouter();

    const logoutHandler = async() =>{
        const response = await axios('api/users/logout')
        router.push('/')
        console.log('logged out')
    }

    return(
        <aside className=" fixed top-0 left-0 z-40 w-[16rem] bg-[#322653] h-screen">       
        <div className="flex flex-col gap-10 p-3" >
            <div className="flex flex-col items-center justify-center">
                <h1 className="mt-10 text-4xl text-white underline font-bold">We Ugly</h1>
                <p className="text-white/40">Admin board</p>
            </div>
            <hr  />

            <div className="flex flex-col gap-6 items-center">
           <Link href={'/Home'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Dashboard</h1>
           </Link>
           <Link href={'/orderstodeliver'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Orders  </h1>
           </Link>
           <Link href={'/completedorders'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Completed Orders  </h1>
           </Link>
           <Link href={'/addproducts'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Add Products</h1>
           </Link>
           <Link href={'/coupon'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Add Coupons</h1>
           </Link>
           <Link href={'/couponlist'} className="text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg" >
            <h1 className="text-sm">Coupons List</h1>
           </Link>
            </div>
        <button className="bg-indigo-600 rounded-md text-white px-4 py-2" onClick={logoutHandler} >
        signout
        </button>
        </div>
        </aside>
    )
}