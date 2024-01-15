


import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import {toast} from "react-toastify";
import React,{useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
//import "react-toastify/dist/ReactToastify.css";

import {isemail} from "../helper/regexmatcher"
import { createAccount } from "../redux/slices/authslice.jsx";
import Homelayout from "../layout/Homelayout";
//import { clearsuccess } from "../redux/slices/authslice";
//import { registeruser } from '../redux/slices/authslice'; 

function isvalidpassword(password) {
  if (password.length < 6 || password.length > 16) {
    return false;
  }
  return true;
}

// const registeredusers=[];
// async function mockregisteruser(signupdetails) {
// const userexists=registeredusers.some((user=>user.email===signupdetails.email));

// if(userexists){
//     return{
//         success:false,
//         message:'Account with this email already exists',
//     };
// }
// registeredusers.push(signupdetails);
//  return {
//     success: true,
//     message: 'User registered successfull',
//   };

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ success: true, message: 'User registered successfully' });

//        reject({ success: false, message: 'Registration failed' });
//     }, 1000);
//   });
//}

function Signup(){
    const navigate=useNavigate();
            const dispatch=useDispatch();


    const accountCreationSuccess=useSelector((state)=>state.auth.accountCreationSuccess)||false;
const successmessage=useSelector((state)=>state.auth.successmessage)||'';
const user = useSelector((state) => state.auth.user);


    const [signupdetails,setsignupdetails]=useState({
email:'',
fullname:'',
password:'',
avator:''
}); 


const [previewpage,setpreviewpage]=useState(null);

function handleuserinput(e){
    const {name,value}=e.target;
    setsignupdetails({
        ...signupdetails,
        [name]:value
    })
}

function handleimage(e){
    e.preventDefault();
    const uploadimage=e.target.files[0];

    if(!uploadimage) return;
    const imageurl=URL.createObjectURL(uploadimage);
    setpreviewpage(imageurl);

    setsignupdetails({
        ...signupdetails,
        avator:uploadimage,
    });
    const filereader=new FileReader();
    filereader.readAsDataURL(uploadimage);
    filereader.addEventListener("load",function(){
        setpreviewpage(this.result);
    })
}

useEffect(()=>{
    return ()=>{
        if(previewpage){
            URL.revokeObjectURL(previewpage);
        }
    };
},[previewpage]);
console.log("form submission started");

async function onformsubmit(e){
    e.preventDefault();
console.log("form submission started");
console.log('Signup form data:', signupdetails);


if(!signupdetails.fullname||!signupdetails.email||!signupdetails.password||!signupdetails.avator){
console.log("Form submission details are missing");
    toast.error("please fill the details");
    return;
    }
if(signupdetails.fullname.length<5){
    console.log("Full name should be at least 5 characters");
    toast.error("Name should be atleast 5 charectors");
    return;
}
if(!isemail(signupdetails.email)){
    console.log("Invalid email provided");
    toast.error("invalid email provided");
    return;
}

if(!isvalidpassword(signupdetails.password)){
    console.log("Invalid password provided");
    toast.error("invalid password provided,password should 6-16 charactor long with atleast a number");
    return;
}

const formdata=new FormData();    
   formdata.append("fullname",signupdetails.fullname);
   formdata.append("email",signupdetails.email);
  formdata.append("password",signupdetails.password);
   formdata.append("avator",signupdetails.avator);

//    formdata.append("fullname", "John");
// formdata.append("email", "john@example.com");

// const fullname = formdata.get("fullname"); 
// const email = formdata.get("email"); 

// console.log("Full Name:", fullname);
// console.log("Email:", email);

console.log("dispatch createaccount");

formdata.forEach((value, key) => {
  console.log(`Key: ${key}, Value: ${value}`);
    
console.log("Before console.log");
  console.log("formdata",`Key: ${key}, Value: ${value}`);
console.log("after console.log");
});
console.log('Data in signup.jsx:', formdata);
console.log('FormData content before dispatch in signup.jsx:', Array.from(formdata.entries()));


        const response = await dispatch(createAccount(formdata));
        console.log(response);
        console.log(response.payload);
        
if (response.payload?.success) {
  console.log('Registration success:', response.payload.success);
  console.log('Success message:', response.payload.message);

  // Access user data if available
  const userdata = response.payload.userdata;
  console.log('User data:', userdata);

  // Additional actions or handling for success
} else {
  console.error('Registration failed:', response.payload.success);
  console.error('Error message:', response.payload.message);
  // Additional actions or handling for failure
}
    //    console.log(response.payload.data);


        if(response?.payload?.data) {
            navigate("/");
        }
        setsignupdetails({
            email: '',
            fullName: '',
            password: '',
            avatar: ''
        });
        setpreviewimage("");
    

// // Define an asynchronous function to handle the signup process
// const signupasync = async () => {

//   try {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log('Signup process completed successfully.');
//   } catch (error) {
//     console.error('Error during signup:', error);
//   }
// };

// // Call the signupAsync function
// signupasync();






// dispatch(createAccount (formdata));

//  try{
// const action=await dispatch(createAccount(formdata));
// const responsecreateaccount=action.payload;
// console.log("response from createAccount",responsecreateaccount);

// //const response = await mockregisteruser(signupdetails);

//   if (responsecreateaccount&&responsecreateaccount.error) {
//   alert('Failed to create an account. Please check your details.');
// } else if (responsecreateaccount.success) {
//   alert('User registered successfully');
//    setsignupdetails({
//       ...signupdetails,
//       email: '',
//       fullname: '',
//       password: '',
//       avator: '',

//     });
//     setpreviewpage(""),
//     navigate('/signup');
// }

// }catch(error){
//     console.log("error during form submission",error);
//     toast.error("an error occured during form submission");
// }

// useEffect(() => {
//     if (accountCreationSuccess) {
//       alert(successmessage);
//       dispatch(clearsuccess());
//     }
//   }, [accountCreationSuccess, successmessage, dispatch]
// );


   
}
return(
<Homelayout>
<div className="flex overflow-x-auto items-center justify-center h-[100vh]">
    <form onSubmit={onformsubmit}>
<h1 className="text-2xl text-center font-bold">Signup</h1>

<label htmlFor="imageuploads" className="cursor-pointer">
{previewpage?(
<img className="w-24 h-24 rounded-full m-auto" src={previewpage} alt="Preview"/> 
):(<BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
)}</label>

<input
     type="file"
     className="hidden"
     name="image_uploads"
     id="image_uploads"
accept=".jpg,.jpeg,.png,.svg"
onChange={handleimage}
    />

<div className="flex flex-col gap-1">
    <label htmlFor="fullname" className="font-semibold">Name</label>

<input
     required
     onChange={handleuserinput}
     value={signupdetails.fullname}
     type="text"
     name="fullname"
     className="bg-transparent px-2 py-1 border"
     placeholder="enter your username..."
     id="fullname"
    />
</div>


<div className="flex flex-col gap-1">
    <label htmlFor="email" className="font-semibold">email</label>
<input
     required
     onChange={handleuserinput}
     value={signupdetails.email}
     type="text"
     name="email"
     className="bg-transparent px-2 py-1 border"
     placeholder="enter your email..."
     id="email"
    />
</div>


<div className="flex flex-col gap-1">
    <label htmlFor="password" className="font-semibold">password</label>

<input
     required
 onChange={handleuserinput}
     value={signupdetails.password}
     type="password"
     name="password"
     className="bg-transparent px-2 py-1 border"
     placeholder="enter your password..."
     id="password"
    />
</div>
<div>
    {user?(
    <div>
        <h2>fullname:{user.fullname}</h2>
        <p>email:{user.email}</p>
    </div>):(<p>
        No user data available</p>
            )}
    </div>

<button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease">
    Create account
</button>

<p className="text-center">
    Already have an account?<Link>Login</Link>
</p>

</form>
</div>
</Homelayout>
);
}

export default Signup;