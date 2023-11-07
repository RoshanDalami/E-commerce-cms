"use client";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/config";
import { useEffect } from "react";
import Image from "next/image";
import OrderProductCard from "../Components/orderCard";

export default function Orders() {
  const [orders, setOrders] = useState([{}]);
  const getOrders = async () => {
    const dbRef = collection(db, "orders");
    const response = await getDocs(dbRef);
    const data = response.docs.map((doc) => ({ ...doc.data(),id:doc.id }));
    setOrders(data);
    console.log(data);
  };
  useEffect(() => {
    getOrders();
  }, []);
console.log(orders)
  if (orders.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold text-center ml-[17rem]">Orders</h1>
        <div className="flex items-center justify-center mt-20 ml-[17rem] ">
          <p className="text-xl opacity-70">no order yet...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="ml-[17rem]">
        <h1 className="text-3xl font-bold">Completed Orders</h1>
        {orders?.map((item: any, index) => {
          if(item.status === 'delivered'){
            return (
              <div
                key={index}
                className="border-[1px] border-black p-4 my-10 mx-10 md:mx-20 rounded-lg"
              >
                <div className="flex items-center justify-between" >
  
                <h1 className="text-3xl font-bold  "> Product Details</h1>

                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 my-3">
                  {item.items?.map((product: any, index: number) => {
                    return (
                      <>
                        <OrderProductCard
                          key={index}
                          id={item.id}
                          image={product.image}
                          title={product.title}
                          amount={product.amount}
                          price={product.price}
                          code={item.userCouponCode}
                        />
                      </>
                    );
                  })}
                </div>
                <h1 className="text-3xl" key={index}>
                  Total amount : Rs {item.totalAmount}
                </h1>
                <hr />
                <div key={index} className="mt-2">
                  <h1 className="text-2xl font-bold underline">
                    Shipping Address
                  </h1>
                  <p>Name : {item.address?.fullname}</p>
                  <p>Email : {item.address?.email}</p>
                  <p>Phone : {item.address?.phone}</p>
                  <p>Address 1 : {item.address?.address1}</p>
                  <p>Address 2 : {item.address?.address2}</p>
                  <p>City : {item.address?.city}</p>
                  <p>State : {item.address?.state}</p>
                  <p>Pin code : {item.address?.postal}</p>
                </div>
              </div>
            );
          }
        })}
      </main>
    </>
  );
}
