"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import gif from '@/Images/voucher.gif';
import { db } from "@/Firebase/config";
import { addDoc , collection } from "firebase/firestore";
export default function Coupon() {
  const [couponDetails, setCouponDetails] = useState({
    couponCode: "",
    couponDiscount: "",
  });
  const onSubmitHandler = async(e:FormEvent)=>{
    e.preventDefault();
    const dbRef = collection(db,'coupon');
    const response = await addDoc(dbRef,{
      code : couponDetails.couponCode.toUpperCase(),
      discount : couponDetails.couponDiscount
    })
    console.log(response)
    setCouponDetails({
      couponCode: "",
    couponDiscount: "",
    })
  }
  return (
    
      <div className=" ml-[16rem] flex flex-col items-center justify-center min-h-screen gap-20">
        <div className="flex flex-col items-center">

        <Image src={gif} alt="gif" width={300} height={300} />
        <h1 className="text-3xl font-bold">Add Coupon Codes</h1>
        </div>
        <form className="flex flex-col items-center justify-center gap-6 w-3/4 " onSubmit={onSubmitHandler} >
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Coupon Code</h1>
            <input
              type="text"
              value={couponDetails.couponCode}
              onChange={(e) =>
                setCouponDetails({
                  ...couponDetails,
                  couponCode: e.target.value,
                })
              }
              placeholder="coupon code"
              className="border-2 border-gray-300 py-2 px-2  rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Coupon Discount Percentage</h1>
            <input
              type="number"
              value={couponDetails.couponDiscount}
              onChange={(e) =>
                setCouponDetails({
                  ...couponDetails,
                  couponDiscount: e.target.value,
                })
              }
              placeholder="coupon discount"
              className="border-2 border-gray-300 py-2 px-2  rounded-md w-4/4"
              required
            />
          </div>
          <button className="bg-indigo-600 px-10 py-2 rounded-md text-white"type="submit" >add</button>
        </form>
      </div>
  );
}
