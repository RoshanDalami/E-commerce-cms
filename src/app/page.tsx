'use client';
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./Components/card";
import {collection , getDocs} from 'firebase/firestore';
import { db } from "@/Firebase/config";
import { useEffect } from "react";

export default function Home() {
  const [products , setProducts] = useState([{}]);

  const getProducts = async()=>{
    const dbRef = collection(db,'Information');
    const response = await getDocs(dbRef);
    const data = response.docs.map((doc)=>({...doc.data()}));
    setProducts(data);
  }

  useEffect(()=>{
    getProducts();
  },[])

  console.log(products)

  return (
    <main className="">
      <h1 className="text-4xl font-bold m-5 text-center underline">Featured Products</h1>
      <div className="flex gap-6 flex-wrap items-center justify-center my-12">

      {
        products?.map((product:any,index)=>{
          return <ProductCard key={index} image={product.imageulr} description={product.description} title={product.title} price={product.price} />
        })
      }
      </div>
    </main>
  );
}
