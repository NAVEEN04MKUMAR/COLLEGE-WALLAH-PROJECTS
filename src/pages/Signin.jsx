


console.log("hi");

import React,{ useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";

import Homelayout from "../layout/Homelayout";
import { isemail } from "../helper/regexmatcher";
import { signinsuccess } from "../redux/slices/authslice";
import { signinaction } from "../redux/slices/authslice";
import {logout} from '../action/authactions';



function isvalidpassword(password) {
  if (password.length < 6 || password.length > 16) {
    return false;
  }
  return true;
}

function Signin(){
   // const history=useHistory();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [signindetails,setsignindetails]=useState({
email:'',
password:'',
}); 


const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };

async function onformsubmit(e){
    e.preventDefault();

const userdata={
    email:signindetails.email,
    password:signindetails.password,
};

try{
const action=await dispatch(signinaction(signindetails));
// Log the entire action to see what's inside
  console.log('Full Action:', action);

const response=action.payload;
console.log(response);
console.log(response.success);
console.log(response.message);

  if (response.success) {
    alert('User loggedin successfully');
    // navigate("/");
  } else {
    alert('Failed to create an account. Please check your details.');
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
  }
setsignindetails({
    email:'',
    password:''
});
}catch(error){
    console.log("error during form submission",error);
        console.error('Error message:', error.message);
    console.error('Error response:', error.response);

    toast.error("an error occured during form submission");
}

    if(!signindetails.email||!signindetails.password){
toast.error("please fill the details");
return;
}

if(!isemail(signindetails.email)){
    toast.error("invalid email provided");
    return;
}

if(!isvalidpassword(signindetails.password)){
    toast.error("invalid password provided,password should 6-16 charactor long with atleast a number");
    return;
}
}
return(
 <Homelayout> 
    <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
    <form onSubmit={ onformsubmit}>
     <h1 className="text-2xl text-center font-bold">Signin</h1>
     <div className="flex flex-col gap-1">
    <label htmlFor="email" className="font-semibold">email</label>
<input
     required
     type="text"
     name="email"
     value={signindetails.email}
     onChange={(e)=>
        setsignindetails({
        ...signindetails,
        email:e.target.value,
    })}
     className="bg-transparent px-2 py-1 border"
     placeholder="enter your email..."
     id="email"
    />
</div>


<div className="flex flex-col gap-1">
    <label htmlFor="password" className="font-semibold">password</label>

<input
     required
     type="password"
     name="password"
      value={signindetails.password}
     onChange={(e)=>
        setsignindetails({
        ...signindetails,
        password:e.target.value,
    })}
     className="bg-transparent px-2 py-1 border"
     placeholder="enter your password..."
     id="password"
    />
</div>
<button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease">
    Signin
</button>
<p className="text-center">
Don't have an account<Link to='Signup'>Signup</Link>
</p>

</form>

<button onClick={handleLogout}>Logout</button>

</div>
  </Homelayout> 
);
}

export default Signin;








//import {useHistory} from 'react-router-dom';
//import {useHistory} from "react-router-dom";

//import { BsPersonCircle } from "react-icons/bs";
//import {useEffect} from "react";
//import "react-toastify/dist/ReactToastify.css";
//import { createAccount } from "../redux/slices/authslice";

