"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Logo from '@/Images/newLogo.png'



export default function LoginPage() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [type, setType] = useState(true);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", admin);
      toast.success("Login Successful");
      router.push("/Home");
    } catch (error: any) {
      toast.error("Login fail");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const showPassword = () => {
    setType((prevState) => !prevState);
  };
  return (
    <>
      <h1 className="text-4xl text-center my-10 ">Admin  Panel</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-4xl">
            <CircularProgress />
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-rose-600 p-10 md:w-[500px] mx-auto rounded ">
          <div>
            <Image src={Logo} alt="" width={300} height={100}/>
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="email" className="text-white text-xl">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="py-1 px-3  rounded"
              onChange={(e) => {
                setAdmin({ ...admin, email: e.target.value });
              }}
              required
              value={admin.email}
            />

            <label htmlFor="password" className="text-white text-xl">
              Password
            </label>
            <input
              type={type ? "password" : "text"}
              className="py-1 px-3  rounded"
              placeholder="password"
              onChange={(e) => {
                setAdmin({ ...admin, password: e.target.value });
              }}
              required
              value={admin.password}
            />
            <button
              className="bg-sky-500 px-3 rounded-md  py-2 text-white mt-2"
              onClick={showPassword}
            >
              {type ? "Show Password" : "Hide Password"}
            </button>

            <button
              className="bg-blue-600 px-3 py-1 text-white mt-5"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
