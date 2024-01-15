import { useNavigate } from "react-router-dom";

function Coursecard(props){
    const navigate=useNavigate();
    const {name,description,thumbnailurl}=props.data;
return (
<div onClick={()=>navigate("course/description",{state:{...props}})}
className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor pointer group overflow-hidden">
<div className="overflow-hidden">
    {/* <img src={courseData.thumbnailurl} alt={courseData.name} />
      <h2>{courseData.name}</h2>
      <p>{courseData.description}</p> */}

   <img
          alt="course thumbnail"
          src={thumbnailurl}
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group:hover:scale-[1.2] transition"
        />
        <h2>{name}</h2>
        <p>{description}</p>

</div>
</div>
);
}
export default Coursecard;





 {/* <img
    alt="course thumbnail"
    src={course?.thumbnail?.secure_url}
    className="h-48 w -full rounded-tl-lg rounded-tr-lg group:hover:scale-[1.2] transition"    
    /> */}