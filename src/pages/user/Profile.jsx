
import { useDispatch,useSelector } from "react-redux"
import Homelayout from "../../layout/Homelayout";

function Profile(){


const dispatch=useDispatch();
const userdata=useSelector(state=>state?.auth?.data);

    return(
<Homelayout>
<div className="min-h-[90vh] flex items-center justify-center">

    <div className="my-10 flex flex-col gap-4 ">
        <img
               src={userdata?.avator?.secure_url}
               className="w-40 m-auto rounded-full border border-block"
        />
    <h3 className="text-xl font-semibold text-center capitalize">
    {userdata?.fullname}
    </h3>

<div className="grid grid-cols-2">
     <p>Email:{userdata?.email}</p>
     <p>Role:{userdata?.role}</p>
     <p>Subscription:{userdata?.email}</p>
     <p>Email:{userdata?.subscription?.status==="active" ?"Active":"InActive"}</p>
</div>


<div className="flex items-center justify-center-between gap-2">
<Link to="/changepassword"
className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out">
    <button>
    Change password
    </button>
</Link>

<Link to="/user/editprofile"
className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out">
    <button>
    edit password
    </button>
</Link>
</div>

{userdata?.subscription?.status==="active"&&(
    <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out">
Cancel subscription
    </button>
)}




</div>
</div>

</Homelayout>
)}    

export default Profile;
