import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {Link,useNavigate} from "react-router-dom";


import Homelayout from "../../layout/Homelayout";
import { updateprofile,getuserdata } from "../../redux/slices/authslice";


function Editprofile(){
    const dispatch=useDispatch;
    const navigate=useNavigate();

    //initial state we given the details
    const [data,setdata]=useState({
        fullname:"",
        previewimage:"",
        avatar:undefined,
        userid:useSelector((state)=>state?.auth?._id)
    });

//we upload the image file also we preview the image
    function handleimageupload(event){
        event.preventDefault();
        const uploadimage=event.target.files[0];
        if(uploadimage){
            const filereader=new FileReader();
            filereader.addEventListener("load",function(){
                console.log("load image data url:",this.result);
                setdata({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadimage,

                });
            });
            filereader.readAsDataURL(uploadimage);
        }
    }

//whenever we update the new input field then it will triggered    
    function handleinputchange(event){
        const {name,value}=event.target;
        setdata({...data,[name]:value});
    }

//create the formdata send to the server then dispatch the action
async function onformsubmit(event){
    event.preventDefault();
        if(!data.fullname||!data.avatar){
        toast.error("fill the fullname avator ");
        return;
    }
    if(data.fullname.length<5){
        toast.error("please fill the atleast the 5 letters in the fullname");
        return;
    }
    const formdata=new FormData();
    formdata.append("fullname",data.fullname);
    formdata.append("avatar",data.avatar);
await dispatch(updateprofile([data.userid,formdata]));
await dispatch(getuserdata());
navigate("/profile");

}


return(
    <Homelayout>
<div className="flex flex-col justify-center h-[90vh]">
    <form
         onSubmit={onformsubmit}
         className="flex flex-col justify-center gap-5 rounded-lg p-4 text-write w-80 min-h-[26rem] shadow-[0_0_10px_black]"    
    >
        <h1 className="text-center text-2xl font-semibold">
            Edit Profile
        </h1>

        <label className="cursor-pointer" htmlFor="image_uploads">

        {data.previewimage?(
            <img 
            src={data.previewimage}
            alt="preview"
            className="w-28 h-28 rounded-full -auto"
            />
        ):(
            <BsPersonCircle className="w-28 h28 rounded-full -auto"/>
        )}
        </label>
        <input 
        type="file"
        onChange={handleimageupload}
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .png, .jpeg, .svg"
       // className="hidden"
        />

<div className="flex flex-col gap-1">
                        <label className="text-g font-semibold" htmlFor="fullName">
                            Full name
                        </label>
<input 
        required
        type="text"
        id="fullname"
        name="fullname"
        placeholder="enter your name"
        value={data.fullname}
        onChange={handleinputchange}
        className="bg-transparent px-2 py-1 border"
        />
</div>

        <button 
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 cursor-pointer text-lg">
            update profile
        </button>
 
      <Link to="/profile">
             <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                Go back to profile
             </p>                                  
       </Link>

    </form>
</div>
    </Homelayout>
)

}
export default Editprofile;