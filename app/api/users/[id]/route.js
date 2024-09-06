import { users } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async(req)=>{
    try{
        const id = req.url.split("users/")[1];
        console.log(id);
        console.log(users);

        const singleData = users.filter((user)=> user.id.toString() === id);
        console.log(singleData);

        if(singleData.length === 0){
            return NextResponse.json({message: 'Data not found'}); 
        }

        return NextResponse.json({message: 'OK',singleData});
    }
    catch(err){
            return NextResponse.json({message:'Error',err},{status:500});
    }
}

//Delete
export const DELETE = async(req) =>{
    try{
        const id = req.url.split("users/")[1];

        //find the index of the user to delete
        const userIndex = users.findIndex((user)=> user.id.toString() === id);
        
        if(userIndex === -1){
            return NextResponse.json({message:'Error',Error:'User not found'});
        }

        //Remove the user from the users array
        users.splice(userIndex,1);
        console.log(users);
        return NextResponse.json({message:'User deleted succesfully'});
    }
    catch(err){
        return NextResponse.json({message:'error',err});
    }
}

//UPDATE

export const PUT = async(req) =>{
    try{
        const id = req.url.split("users/")[1];
        const {name} = await req.json();

        //find the user to update
        const user = users.find((user)=>user.id.toString() === id);

        if(!user){
            return NextResponse.json({message:'User not found'});
        }

        user.name = name;
        console.log(users);

        return NextResponse.json({message:'User updated successfully.'});
    }
    catch(err){
        return NextResponse.json({message:'error',err});
    }
}
