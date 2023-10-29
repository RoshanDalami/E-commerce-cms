"use client";


import Modal from "@mui/material/Modal";
import { FormEvent, useEffect, useState } from "react";
import { db, storage } from "@/Firebase/config";
import ModelComp from "./ModalComp";
import NewModel from "./ModelDemo";
import { doc, updateDoc } from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import Image from "next/image";

export default function BasicModal({ formdata, id }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState<File | undefined>();
  const [file1, setFile1] = useState<File | undefined>();
  const [file2, setFile2] = useState<File | undefined>();
  const [file3, setFile3] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState(formdata.imageulr);
  const [imageUrl1, setImageUrl1] = useState(formdata.imageulr1);
  const [imageUrl2, setImageUrl2] = useState(formdata.imageulr2);
  const [imageUrl3, setImageUrl3] = useState(formdata.imageulr3);
  const [formData, setFormData] = useState({
    title: formdata.title,
    description: formdata.description,
    price: formdata.price,
    imageurl:formdata.imageulr, 
    imageurl1:formdata.imageulr1, 
    imageurl2:formdata.imageulr2, 
    imageurl3:formdata.imageulr3, 
  });

  const [data, setData] = useState([{}]);
  console.log(formdata);
  console.log(id);
  console.log(formData)
  console.log(imageUrl);
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
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (imageUrl.length === 0) {
        return;
      }
      if (imageUrl1.length === 0) {
        return;
      }
      if (imageUrl2.length === 0) {
        return;
      }
      if (imageUrl3.length === 0) {
        return;
      }
      const dbRef = doc(db, "Products", id);
      await updateDoc(dbRef, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageulr: imageUrl,
        imageulr1: imageUrl1,
        imageulr2: imageUrl2,
        imageulr3: imageUrl3,
      });
      setFormData({
        title: "",
        description: "",
        price: "",
        imageurl: "",
        imageurl1: "",
        imageurl2: "",
        imageurl3: "",
        
      });
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <div className="">
      <button
        onClick={handleOpen}
        className="px-6 py-3 bg-green-600 text-white rounded-xl hover:scale-110 transition duration-300"
      >
        Edit
      </button>
      {
        open && 
      <NewModel
        closeHandler={handleClose}
      >
        <div className="flex items-center justify-center ">
            <form
              action=""
              className="flex gap-3 flex-col"
              onSubmit={onSubmitHandler}
            >
              {/* image one  */}
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
              {/* image two  */}
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
              {/* image three  */}
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
              {/* image four  */}
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
              <button
                className="bg-blue-600 py-2 rounded text-white"
                type="submit"
              >
                Update
              </button>
              <button
                className="bg-red-600 py-2 rounded text-white"
                onClick={handleClose}
              >
                cancel
              </button>

            </form>
          </div>
      </NewModel>
      }
    </div>
  );
}
