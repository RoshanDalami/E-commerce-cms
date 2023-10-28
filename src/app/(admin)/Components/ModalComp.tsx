"use clinet";
import {  PropsWithChildren, PropsWithRef, PropsWithoutRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";




export default function ModelComp({ children ,closeHandler }:any ) {
 
  return (
    <main className=" absolute z-50 min-h-screen ">
      <div className=" bg-white w-[350px] md:w-[600px] rounded-md shadow-lg border-[1px] broder-gray-300 ">
        <RxCross1
          className="text-3xl ml-[90%] cursor-pointer "
          onClick={closeHandler}
        />
        {children}
      </div>
    </main>
  );
}
