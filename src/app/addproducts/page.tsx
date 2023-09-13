"use client";
import { FormEvent, useEffect, useState } from "react";
import { db, storage } from "@/Firebase/config";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [file, setFile] = useState<File | undefined>();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageurl: "",
  });
  const [data, setData] = useState([{}]);
  const fileUpload = async () => {
    if (!file) {
      return;
    }
    const imageRef = ref(storage, `${file.name + Date.now()}`);
    const uploadImage = await uploadBytes(imageRef, file);
    await getDownloadURL(imageRef).then((url) => setImageUrl(url));
  };
  useEffect(() => {
    if (file) {
      fileUpload();
    }
  }, [file]);
  console.log(imageUrl);
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (imageUrl.length === 0) {
        return;
      }
      const docRef = await addDoc(collection(db, "Information"), {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageulr: imageUrl,
      });
      console.log("Document written with ID", docRef.id);
    } catch (error) {
      console.log("something went wrong", error);
    }
    setFormData({
      title: "",
      description: "",
      price: "",
      imageurl: "",
    });
    router.replace('/')

  };

  const getData = async () => {
    const response = await getDocs(collection(db, "Information"));
    const data = response.docs.map((doc) => ({ ...doc.data() }));
    setData(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-6 m-4">

        <div className="text-2xl font-bold">
           <h1>Add Products</h1> 
        </div>

      <form
        action=""
        className="flex gap-3 flex-col"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col">
          <label htmlFor="">Image</label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files![0]);
            }}
            className="border-[1px] border-black rounded"
          />
          {imageUrl ? <Image src={imageUrl} alt="image preview" width={100} height={100}/>:null}
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Title</label>
          <input
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData.title}
            required
            className="text-black border-[1px] border-gray-400 rounded"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Description</label>
          <input
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            value={formData.description}
            required
            className="text-black border-[1px] border-gray-400  rounded "
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Price</label>
          <input
            type="number"
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
            value={formData.price}
            required
            className="text-black border-[1px] border-gray-400 rounded"
          />
        </div>
        <button className="bg-blue-600 py-2 rounded text-white" type="submit" >
          Submit
        </button>
      </form>
    </div>
  );
}
