import { useEffect,useState } from "react";
// import {toast} from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";

import Homelayout from "../../layout/Homelayout";
import { getcourselectures,deletecourselectures} from "../../redux/slices/LectureSlice.jsx";


function Displaylecture(){

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {state}=useLocation();
    const lectureSlice = useSelector((state) => state.lecture.lectures);
    const { lecturess } = lectureSlice;
    console.log("redux succeed",lecturess)
        // Check if lectures is undefined
  if (!lecturess) {
    return <div>Loading...</div>;
  }

  console.log("redux succeed", lecturess);


    const {role}=useLocation((state)=>state.auth);



    const [currentvideo,setcurrentvideo]=useState(0);

    async function onlecturedelete(cid,lid){
       await  dispatch(deletecourselectures({courseId:cid,lectureId:lid}));
       await dispatch(getcourselectures({state,_id}));
    }

 useEffect(() => {
  console.log('Course Details:', state);

  if (!state) {
    console.log('Navigating to /course');
    navigate("/course");
  }else {
    dispatch(getcourselectures(state?._id));  // Assuming _id is the correct property to pass
  }

}, [state, dispatch, navigate]);

return (
    <Homelayout>
        <h1>displaylecture</h1>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
           
            <div className="text-center text-2xl font-semibold text-yellow-500">
            coursename:{state?.title}
            </div>
 {
    lecturess&&lecturess.length>0&&(
        <div className="flex justify-center gap-10 w-full">
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_tr_lg]">

                        <video
                        src={userinput.videoSrc} 
                        className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                        controls
                        muted
                        controlsList="nodownload"
                        disablePictureInPicture
                        >
                        </video>
                        <h1>
                            <span className="text-yellow-500">
                                Title:{" "}
                            </span>
                            {lecturess[currentvideo]?.title}
                        </h1>
                        <p>
                            <span className="text-yellow-500">
                                Description:{" "}
                            </span>
                            {lecturess[currentvideo]?.description}
                        </p>
            </div>
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5">
                <li  className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                    lecture list
                    {role==="ADMIN"&&(
                    <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                    Add new lecture
                    </button>
                    )}
                </li>
                {lecturess.map((lecture,idx)=>{
                    return(
                        <li className="space-y-2" key ={lecture._id}>
                            <p className="cursor-pointer" onClick={()=>setcurrentvideo(idx)}>
                                   <span>lecture {idx+1}:{" "}</span>{lecture?.title}
                            </p>
                            {
                                role==="ADMIN"&&(
                                    <button onClick={()=>onlecturedelete(state?._id,lecture?._id)} className="btn-accend px-2 py-1 rounded-md font-semibold text-sm">
                                         Delete course
                                    </button>
                                )
                            }

                        </li>
                    )

                })}

            </ul>

        </div>
       )}      
              </div>
    </Homelayout>
    
    )
            }

export default Displaylecture;