"use client";
import Image from "next/image";

import Link from "next/link";

import { useContext } from "react";

export default function ProductCard(props: any) {
  const onEditHandler = () => {
    return null;
  };

  return (
    <>
      <div className="w-[350px] shadow-lg  ">
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
          <p className=" opacity-50">{props.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-xl">Rs{" "}{props.price}</p>
            <div className="flex flex-col gap-3">
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:scale-110 transition duration-300"
                onClick={onEditHandler}
              >
                Edit
              </button>
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:scale-110 transition duration-300"
                onClick={onEditHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
