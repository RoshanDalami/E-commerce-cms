"use client";

import { useState } from "react";
import axios from "axios";
import{ useRouter} from "next/navigation";
export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSignup = async () => {
    try {
      const response = await axios.post('api/users/signup',user);
      console.log('Signup Success',response.data);
      router.push('/')

    } catch (error:any) {
      console.log('Signup failed', error.message);
      
    }finally{
     
    }
  };

  return (
    <>
    <div className=" flex flex-col justify-center items-center  pb-[225px]  ">
        <h1 className="text-4xl mb-10">Signup for New Admin</h1>
      <form action="" className="flex flex-col w-[500px] bg-blue-300 p-10 justify-center items-center " onSubmit={onSignup}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          value={user.username}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          value={user.email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          value={user.password}
        />
       
        <button className="bg-blue-600 px-4 py-2 text-white rounded-lg mt-5" type="submit">Signup</button>
      </form>
    </div>
    </>
  );
}