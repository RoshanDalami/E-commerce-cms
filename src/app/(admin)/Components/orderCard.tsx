"use client";
import Image from "next/image";

import Link from "next/link";

import { useContext } from "react";

export default function OrderProductCard(props: any) {
  return (
    <>
      <div className="w-[350px] shadow-lg   ">

        <Link href={""}>
          <div className="group rounded-lg w-[350px] overflow-hidden">
            <div className="w-[350px] h-[400px] group-hover:scale-125 transition duration-300">
              <Image src={props.image} alt="new" width={350} height={300} />
            </div>
            <div className="  shadow border-2 border-gray-400 flex flex-col overflow-hidden"></div>
          </div>
        </Link>
        <div className="bg-white px-4 py-2 rounded-lg ">
          
          <h1 className="text-xl font-bold">{props.title}</h1>
          <div className="flex justify-between items-center">
            <p>Rs {props.price}</p>
            <p>No. of Amount = {props.amount}</p>
          </div>
          <p className="flex">
            Code ={" "}
            {props.code !== "" ? <p> {" "} {props.code} </p> : <p>no code applied</p>}
          </p>
          <h1>Order Id : {props.id}</h1>
        </div>
      </div>
    </>
  );
}
