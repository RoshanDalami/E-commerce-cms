import { connect } from "@/dbConfig/dbConfig"; //getting connect method from dbConfig folder/dbConfig.ts

import Admin from "@/Model/adminModel";

import { NextRequest, NextResponse } from "next/server"; //to listen to request and response on next
import bcryptjs from 'bcryptjs' //getting bcryptjs encrypt the password.


connect();

//Handling post request in next js. How ever we can handle both request and response
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exist
    const admin = await Admin.findOne({ email });
    // User.findOne return something then that means user already exist.

    if (admin) {
      return NextResponse.json(
        { error: "User already exist " },
        {
          status: 400,
        }
      );
    }

    //hashing Password ;
    //At first we generate a salt.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // const savedUser = await newUser.save();
    const savedUser = await newUser.save()

    console.log(savedUser);
    //send verification email
    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}