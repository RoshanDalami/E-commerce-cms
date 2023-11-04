import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/Model/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //Checking user
    const admin = await Admin.findOne({ email: email });
    console.log(admin);

    if (!admin) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, admin.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Password" },
        {
          status: 400,
        }
      );
    }

    const tokenData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
