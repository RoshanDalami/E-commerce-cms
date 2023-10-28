"use client";
import Image from "next/image";

import Link from "next/link";
import { db } from "@/Firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import BasicModal from "./Modal";




export default function ProductCard(props: any) {
  const onDeleteHandler = async(id:any) => {
      const dbRef = doc(db,'Products',id)
      await deleteDoc(dbRef)
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
              {/* <button
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:scale-110 transition duration-300"
                onClick={()=>{onEditHandler()}}
              >
                Edit
              </button> */}
              <BasicModal formdata={props.formdata} id={props.id} />

              <button
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:scale-110 transition duration-300"
                onClick={()=>{onDeleteHandler(props.id)}}
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
