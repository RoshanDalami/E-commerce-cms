"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    const response = await axios("api/users/logout");
    router.push("/");
    console.log("logged out");
  };
  const links = [
    {
      id: "0",
      title: "Dashboard",
      link: "/Home",
    },
    {
      id: "1",
      title: "Orders",
      link: "/orderstodeliver",
    },
    {
      id: "2",
      title: "Completed Orders",
      link: "/completedorders",
    },
    {
      id: "3",
      title: "Add Products",
      link: "/addproducts",
    },
    {
      id: "4",
      title: "Add Coupon",
      link: "/coupon",
    },
    {
      id: "5",
      title: "Coupon List",
      link: "/couponlist",
    },
  ];

  return (
    <aside className=" fixed top-0 left-0 z-40 w-[16rem] bg-[#322653] h-screen">
      <div className="flex flex-col gap-10 p-3">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-10 text-4xl text-white underline font-bold">
            We Ugly
          </h1>
          <p className="text-white/40">Admin board</p>
        </div>
        <hr />

        <div className="flex flex-col gap-6 items-center">
          {links.map((item) => {

            return (
              <Link
                href={item.link}
                className={clsx(
                  "text-white py-4 px-[4rem] hover:bg-white/40 rounded-lg",
                  { "bg-white/40": pathname === item.link }
                )}
                key={item.id}
              >
                <h1 className="text-sm">{item.title}</h1>
              </Link>
            );
          })}
        </div>
        <button
          className="bg-indigo-600 rounded-md text-white px-4 py-2"
          onClick={logoutHandler}
        >
          signout
        </button>
      </div>
    </aside>
  );
}
