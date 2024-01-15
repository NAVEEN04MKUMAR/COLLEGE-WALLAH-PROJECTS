import axiosInstance from "../config/axiosInstance";
import { isemail } from "../helper/regexmatcher";
import Homelayout from "../layout/Homelayout";
import React, { useState } from 'react';
import {toast} from "react-toastify";

//import Home from "./Home";

function Contact(){
    console.log('Contact component rendered');

    const [formdata, setformdata] = useState({
    username: "",
    email: "",
    message: "",
    });
    function handleInputChange(event){
          const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });

    }
async function onformsubmit(e){
    e.preventDefault();
    if(!formdata.username||!formdata.email||!formdata.message){
        toast.error("all fields are required");
        return;
    }

if(!isemail(formdata.email)){
    toast.error("invalid email provided");
    return;
}
try{
    const response=axiosInstance.post("/contact",formdata);
    toast.promise(response,{
        loadinng:"submitting your query",
        success:"form submitted successfully",
        error:"failed to submit form"
    });

}catch(error){
    toast.error("operation failed...")
}
}


return(
     <Homelayout>
<div className="flex items-center justify-center h-[100vh]">
<form onSubmit={onformsubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem]">
    <h1 className="text-3xl font-semibold">Contact form</h1>
<div className="flex flex-col w-full gap-1">
    <label htmlFor="username" className="text-xl font-semibold">
        Name
    </label>
    <input 
    id="username"
    className="bg-white border px-2 py-1 rounded-sm"
    type="text"
    placeholder="enter your name"
    name="username"
    value={formdata.username}
    onChange={handleInputChange}
    />
</div>


<div className="flex flex-col w-full gap-1">
    <label htmlFor="email" className="text-xl font-semibold">
        Email
    </label>
    <input 
    id="email"
    className="bg-white border px-2 py-1 rounded-sm"
    type="email"
    placeholder="enter your email"
    name="email"
    value={formdata.email}
    onChange={handleInputChange}
    />
</div>


<div className="flex flex-col w-full gap-1">
    <label htmlFor="message" className="text-xl font-semibold">
        Message
    </label>
    <input 
    id="message"
    className="bg-white border px-2 py-1 rounded-sm"
    type="text"
    placeholder="enter your message"
    name="message"
    value={formdata.message}
    onChange={handleInputChange}
    />
</div>
<button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold">
    submit
</button >
</form>
</div>
     </Homelayout> 
)
}
export default Contact;