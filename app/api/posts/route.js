import { NextResponse } from "next/server";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts"

export async function GET(){
    const res = await fetch(DATA_URL);
    const posts = await res.json();

    return NextResponse.json(posts);
}

export async function POST(request){
    try{
        const {title,body,userId} = await request.json();

        const res = await fetch(DATA_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                /*'API-KEY': API_KEY (If required) */
            },
            body:JSON.stringify({
                title,
                body,
                userId
            })
        });
        if(res.status == 201){
            const newPost = await res.json();
            return NextResponse.json(newPost);
        }
        else{
            console.error("Post request is failed with status : ",res.status);
            return NextResponse.error("Post request failed");
        }
    }
    catch(err){
        console.log("Post request error:",err);
        return NextResponse.error("Post request failed");
    }
}

export async function PUT(request){
    const {userId, title, body} = await request.json();

    const res = await fetch(`${DATA_URL}/${id}` ,{
        method:'PUT',
        headers:{
            'Content-Type' :'application/json',
        },
        body:JSON.stringify({
                id,
                title,
                body,
                userId
            })
    });

    if(res.status === 200){
        const updatedPost = await res.json();
        return NextResponse.json(updatedPost);
    }
    else{
        return NextResponse.json('PUT Request Failed');
    }
}

export async function DELETE(request){
    try{
        const {id} = await request.json(); //assuming you want to delete this post

        const res = await fetch(`${DATA_URL}/${id}` ,{
        method:'DELETE',
        headers:{
            'Content-Type' :'application/json',
        }
    });
        return NextResponse.json({"message":"Data Deleted"});
    }
        catch(err){

    }
}