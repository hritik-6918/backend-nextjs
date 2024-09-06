/*
import { NextResponse } from "next/server";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const name = searchParams.get('name');
    const age = searchParams.get('age');
    console.log(searchParams);
    console.log(name,age);
 return NextResponse.json({name,age})
}
*/
import { users } from "@/lib/db";
import { NextResponse } from "next/server";

//GET
export const GET = async(req,res) =>{
    try{
        return NextResponse.json(users);
    }
    catch(err){
        return NextResponse.json({message:'Error',err},{status:500});
    }
}

//POST
export const POST = async(req,res) =>{
    const {name} = await req.json();
    console.log(name);
    try{
        const newData = {name};
        newData.id = users.length + 1;
        users.push(newData);
        return NextResponse.json((users));
    }
    catch(err){
         return NextResponse.json({message:'Error',err},{status:500});
    }
}