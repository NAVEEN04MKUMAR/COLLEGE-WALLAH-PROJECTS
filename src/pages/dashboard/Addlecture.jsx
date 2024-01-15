// import { useEffec,useState } from "react";
// import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";

import Homelayout from "../../layout/Homelayout";
import Signin from "../Signin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addcourselectures } from "../../redux/slices/LectureSlice.jsx";
 //import { addcourse } from "../../redux/slices/courseslice";


function Addlecture(){
     const coursedetails = useLocation().state || {};

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [userinput,setuserinput]=useState({
        id:coursedetails?._id|| "defaultId",
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });

    function handleinputchange(e){
        const {name,value}=e.target;
        setuserinput({
            ...userinput,
            [name]:value
        })
    }
async function handlevideo(e){
        const video=e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
   
   if (video) {

    try {
      const src = window.URL.createObjectURL(video);
      console.log("src", src, video);
      setuserinput({
        ...userinput,
        lecture: video,
        videoSrc: src
      });

      const postData = {
  title: userinput.title,
  description: userinput.description,
  videoSrc: userinput.videoSrc,
};
      // Example: Make a POST request to the server
      const response = await fetch('http://localhost:5014/api/v1/courses/defaultId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify({ postData }),
      });

      const data = await response.json();
    console.log(data);


      // Check the response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Continue processing the response if needed
    } catch (error) {
      console.error('Error:', error);
    }
}
        else{
             console.log("No video selected");
        }
        
}

async function onformsubmit(e){
    e.preventDefault();
     console.log('Submitting form...');
    if(!userinput.lecture||!userinput.title||!userinput.description){
    toast.error("all fields are mandatory");
    return;
}
//  await handlevideo();

const response=await dispatch(addcourselectures(userinput));
console.log('Response from addcourselectures:', response);



if(response?.payload?.success){
    navigate(-1);
setuserinput({
        id:coursedetails._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });
}
}
useEffect(() => {
  console.log('Course Details:', coursedetails);

  if (!coursedetails) {
    console.log('Navigating to /course');
    navigate("/course");
  }
}, []);

return (
    <Homelayout>
        <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-15">
           
           <div className="flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
            <header className="flex items-center justify-center relative">
            <button className="absolute left-2 text-2 text-xl text-green-500">
                Addlecture
                {/* <AiOutlineArrowLeft /> */}
            </button>
             <h1 className="text-xl text-yellow-500 font-semibold">
                Addlecture
            </h1>   
            </header>  
            <form onSubmit={onformsubmit}
            className="flex flex-col gap-3"
            >
                <input
                type="text"
                name="title"
                placeholder="enter the title of the lecture"
                className="bg-transparent px-3 py-1 border"
                value={userinput.title}
                onChange={handleinputchange}
                />
                <textarea
                type="text"
                name="description"
                placeholder="enter the description of the lecture"
                className="bg-transparent px-3 py-1 border"
                value={userinput.description}
                onChange={handleinputchange}
                />

                {
                    userinput.videoSrc?(
                        <video 
                        className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                        controls
                        muted
                        src={userinput.videoSrc}
                        controlsList="nodownload"
                        disablePictureInPicture
                        >
                        </video>
                        ):(
                            <div className="h-48 border flex items-center justify-center curson-pointer">
                                <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">choose your lecture</label>
                                 <input
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handlevideo}
                                    accept="video/mp4 video/x-mp4 video/*"
                               />
                            </div>
                        )
                }
            
          <button type="submit" className="btn-primary py-1 text-lg font-semibold">
               Add new lecture
            </button>
              </form>
            </div>
        </div>
    </Homelayout>
)
}

export default Addlecture;