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
  const [file1, setFile1] = useState<File | undefined>();
  const [file2, setFile2] = useState<File | undefined>();
  const [file3, setFile3] = useState<File | undefined>();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    afterDiscountPrice: "",
    price: "",
    imageurl: "",
    imageurl1: "",
    imageurl2: "",
    imageurl3: "",
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
  const fileUpload1 = async () => {
    if (!file1) {
      return;
    }
    const imageRef = ref(storage, `${file1.name + Date.now()}`);
    const uploadImage = await uploadBytes(imageRef, file1);
    await getDownloadURL(imageRef).then((url) => setImageUrl1(url));
  };
  const fileUpload2 = async () => {
    if (!file2) {
      return;
    }
    const imageRef = ref(storage, `${file2.name + Date.now()}`);
    const uploadImage = await uploadBytes(imageRef, file2);
    await getDownloadURL(imageRef).then((url) => setImageUrl2(url));
  };
  const fileUpload3 = async () => {
    if (!file3) {
      return;
    }
    const imageRef = ref(storage, `${file3.name + Date.now()}`);
    const uploadImage = await uploadBytes(imageRef, file3);
    await getDownloadURL(imageRef).then((url) => setImageUrl3(url));
  };
  useEffect(() => {
    if (file) {
      fileUpload();
    }
  }, [file]);
  useEffect(() => {
    if (file1) {
      fileUpload1();
    }
  }, [file1]);
  useEffect(() => {
    if (file2) {
      fileUpload2();
    }
  }, [file2]);
  useEffect(() => {
    if (file3) {
      fileUpload3();
    }
  }, [file3]);
  console.log(imageUrl);
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (imageUrl.length === 0) {
        return;
      }
      const docRef = await addDoc(collection(db, "Products"), {
        title: formData.title,
        description: formData.description,
        afterDiscountPrice: formData.afterDiscountPrice,
        price: formData.price,
        imageulr: imageUrl,
        imageulr1: imageUrl1,
        imageulr2: imageUrl2,
        imageulr3: imageUrl3,
      });
      console.log("Document written with ID", docRef.id);
    } catch (error) {
      console.log("something went wrong", error);
    }
    setFormData({
      title: "",
      description: "",
      afterDiscountPrice: "",
      price: "",
      imageurl: "",
      imageurl1: "",
      imageurl2: "",
      imageurl3: "",
    });
    router.replace("/");
  };

  const getData = async () => {
    const response = await getDocs(collection(db, "Information"));
    const data = response.docs.map((doc) => ({ ...doc.data() }));
    setData(data);
  };

  return (
    <main className="ml-[17rem]">
      <div className="flex items-center justify-center min-h-screen flex-col gap-6 m-4">
        <div className="text-2xl font-bold">
          <h1>Add Products</h1>
        </div>

        <form
          action=""
          className="flex gap-3 flex-col"
          onSubmit={onSubmitHandler}
        >
          {/* first Image  */}
          <div className="flex flex-col">
            <label htmlFor="">Image</label>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
              className="border-[1px] border-black rounded"
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="image preview"
                width={100}
                height={100}
              />
            ) : null}
          </div>
          {/* second image  */}
          <div className="flex flex-col">
            <label htmlFor="">Image 1</label>
            <input
              type="file"
              onChange={(e) => {
                setFile1(e.target.files![0]);
              }}
              className="border-[1px] border-black rounded"
            />
            {imageUrl1 ? (
              <Image
                src={imageUrl1}
                alt="image preview"
                width={100}
                height={100}
              />
            ) : null}
          </div>
          {/* third image  */}
          <div className="flex flex-col">
            <label htmlFor="">Image 2</label>
            <input
              type="file"
              onChange={(e) => {
                setFile2(e.target.files![0]);
              }}
              className="border-[1px] border-black rounded"
            />
            {imageUrl2 ? (
              <Image
                src={imageUrl2}
                alt="image preview"
                width={100}
                height={100}
              />
            ) : null}
          </div>
          {/* fourth image  */}
          <div className="flex flex-col">
            <label htmlFor="">Image 3</label>
            <input
              type="file"
              onChange={(e) => {
                setFile3(e.target.files![0]);
              }}
              className="border-[1px] border-black rounded"
            />
            {imageUrl3 ? (
              <Image
                src={imageUrl3}
                alt="image preview"
                width={100}
                height={100}
              />
            ) : null}
          </div>
          {/* details  */}
          <div className="flex flex-col ">
            <label htmlFor="">Title</label>
            <input
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
              required
              className="text-black  py-2 px-4  border-[1px] border-gray-400 rounded"
              placeholder="title"
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
              className="text-black  py-2 px-4  border-[1px] border-gray-400  rounded "
              placeholder="description"
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
              className="text-black py-2 px-4 border-[1px] border-gray-400 rounded"
              placeholder="price"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">Before Discount Price</label>
            <h1 className=" sr-only">Actual price Have naming mistake </h1>
            <input
              type="number"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  afterDiscountPrice: e.target.value,
                });
              }}
              value={formData.afterDiscountPrice}
              required
              className="text-black py-2 px-4 border-[1px] border-gray-400 rounded"
              placeholder="price after discount"
            />
          </div>
          <button className="bg-blue-600 py-2 rounded text-white" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
