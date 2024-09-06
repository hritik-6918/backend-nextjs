import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";
import mongoose from "mongoose"; // Ensure mongoose is imported

export async function POST(req) {
  const { fullname, email, message } = await req.json();

  try {
    await connectDB();
    await Contact.create({ fullname, email, message });

    // Corrected the return statement
    return NextResponse.json({ msg: ["contact server"] });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in err.errors) {
        errorList.push(err.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      // Correctly placed the else statement
      return NextResponse.json({ msg: ["Unable to send message"] });
    }
  }
}
