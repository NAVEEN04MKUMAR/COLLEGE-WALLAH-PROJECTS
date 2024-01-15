import {  useSelector } from "react-redux/es/hooks/useSelector";
import {useLocation,useNavigate} from "react-router-dom";

import Homelayout from "../../layout/Homelayout";



const mockCourseData = {
  numberoflectures: 10,
  createdby: "John Doe",
    title: "Web Development Course",
  description: "Learn web development from scratch.",
};




function Coursedescription(){

const {state}=useLocation();
const navigate=useNavigate();

const {role,data}=useSelector((state)=>state.auth);

return(
    <Homelayout>
<div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
    <div className="space-y-5">
    <img 
    className="w-full h-64"
    alt="thumbnail"
    src={state?.thumbnail?.secure_url}
    />
    <div className="space-y-4">
        <div className="font-semibold">
            <p className="font-semibold">
                <span className="font-bold text-yellow-500">Total lectures:{" "}</span>{mockCourseData.numberoflectures}
            </p>
           <p className="font-semibold">
                <span className="font-bold text-yellow-500">Instructor:{" "}</span>{mockCourseData.createdby}
            </p>
         </div>

{role=="ADMIN"|| data?.subscription?.status==='active'?(
    <button className="bg-yellow-500 text-xl rounded-md">
        watch lectures
    </button>
):(
    <button>Subscribe</button>
)}
      </div>
      <div className="space y-2 text-xl">
        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
            {mockCourseData.title}
        </h1>
        <p className="text-yellow-500">
            Course Description:{" "}
        </p>
        <p>
            {mockCourseData.description}
        </p>

      </div>
   </div>
</div>
    </Homelayout>
);
}
export default Coursedescription;