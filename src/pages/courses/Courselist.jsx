import {useDispatch,} from "react-redux";
import Homelayout from "../../layout/Homelayout";
//import { addcourse } from "../../redux/slices/courseslice";
//import  {Coursedata} from "../coursedata/Coursedata";
import Coursecard from "../../components/Coursecard";


function Courselist(){
const dispatch=useDispatch();


  const courseData = {
    name: "Web Development Bootcamp",
    description: "Full-stack web development course",
    thumbnailUrl: "https://example.com/webdev-thumbnail.jpg",
  };
  dispatch(addcourse(courseData));



return(
    <Homelayout>
        <div className="min-h-[90vh] pt-12 pl-20 fe\lex flex-col gap-10 text-white">
            <h1 className="text-center text-4xl font-semibold mb-5">
Explore courses made by {" "}
<span className="font-bold text-yellow-500">Industry exports</span>
            </h1>
            <div className="mb-10 flex flex-wrap gap-14">                
                 <Coursecard key={courseData._id} data={courseData}/>
        </div>
        </div>
    </Homelayout>
);
}

export default Courselist;



//  {Coursedata?.map((course)=>{})}

//import { useEffect } from "react";
//import {useSelector} from "react-redux";
//import { getallcourses } from "../redux/slices/courseslice";
//    const {Coursedata}=useSelector((state=>state.course.Coursedata));

//   async function loadcourses(){
//          await dispatch(getallcourses());
//     }

// useEffect(()=>{
// loadcourses();
// },[])
