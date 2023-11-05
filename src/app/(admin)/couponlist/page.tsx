"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/Firebase/config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

interface CouponList  {
    code: string,
    discount:string,
    id:string
}


export default function CouponList() {
  const [couponList, setCouponList] = useState([{}]);

  const getCouponList = async () => {
    const dbRef = collection(db, "coupon");
    try {
      const response = await getDocs(dbRef);
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data);
      setCouponList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCouponList();
  }, []);

  const couponDeleteHandler = async (id: string) => {
    const dbRef = doc(db, "coupon", id);
    await deleteDoc(dbRef);
  };

  return (
  <div className="flex items-center  justify-center flex-col  ">
    <h1 className="text-3xl font-bold">
        Active Coupons
    </h1>

<div className="my-6">

    {
        couponList.map((item:any)=>{
            return(
                <div key={item.id} className="flex gap-5 my-2 items-center rounded-md bg-gray-400/30 px-5 py-3 justify-between  " >
                  <div>

                    <h1 className="font-bold"> Code = {item.code}</h1>
                    <p > Discount = {item.discount}</p>
                  </div>
                    <button onClick={()=>{couponDeleteHandler(item.id)}} className="border-2 border-red-600 rounded-md px-4 py-1 text-red-600 " >
                        Delete
                    </button>
                </div>
            )
        })
    }
</div>
    
  </div>
  );
}
