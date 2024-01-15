import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {AiFillCloseCircle} from 'react-icons/ai';


import Footer from "../components/Footer";



function Homelayout({children}){

const dispatch=useDispatch();
const navigate=useNavigate();

const isloggedin=useSelector((state)=>state?.auth?.isloggedin);
const role=useSelector((state)=>state?.auth?.role);

  console.log('isloggedin:', isloggedin);
  console.log('role:', role);



//width of the side menu set to the auto
function changewidth(){
    const drawerSide=document.getElementsByClassName("drawer-side");
    if(drawerSide.length>0){
    drawerSide[0].style.width="auto";
}
}

function hideDrawer(){
    const element=document.getElementsByClassName("drawer-toggle");
    element[0].checked=false;

    const drawerside=document.getElementsByClassName("drawer-toggle");
    drawerside[0].style.width='0';

}
async function logout(e){
    e.preventDefault();

    const response=await dispatch(logout())
if(response?.payload?.data);
    navigate("/");
}

    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    <label htmlFor="ny-drawer">
                        <FiMenu onClick={changewidth} size={"32px"} className="font-bold text white m-4"/>
                    </label>
                </div>
                <div className="drawer-side w-3">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
           
                      <li className="w-fit absolute right-2 z-50">
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24}/>
                        </button>
                       </li>   
                    <ul className="menu p-4 w-48 sn:w-80 bg-base200 text-base-content relative">                 
                       <li>
                        <Link to="/">
                            Home
                        </Link>
                        </li>
                        {isloggedin&&role=="ADMIN"&&(
                            <li>
                                <Link to="/admin/dashboard">Admin dashboard</Link>
                            </li>
                        )}

 {isloggedin&&role=="ADMIN"&&(
                            <li>
                                <Link to="/course/create">Createcourse</Link>
                            </li>
                        )}

                         <li>
                        <Link to="/about">
                            About us
                        </Link>
                        </li>  
                        
                         <li>
                        <Link to="/contact">
                         Contect
                        </Link>
                        </li>
                         
                         <li>
                        <Link to="/courses">
                        All courses
                        </Link>
                        </li> 

                        {isloggedin?
                        ( <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex-items-center justify-center">
                                          <Link to="/signin" className="btn-primary px-4 py-1 font-semibold rounded-md w-full">Login</Link>
                                          <Link to="/signup" className="btn-primary px-4 py-1 font-semibold rounded-md w-full">Signup</Link>
                                </div>
                            </li>):(
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex-items-center justify-center">
                                    <Link to="/user/profile" className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                    Profile
                                    </Link>
                                        <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full" onClick={logout}>
                                        Logout
                                        </button>
                                  </div>
                            </li>
                        )};

                    </ul>
                </div>

            </div>
        {children}
        <Footer />
        </div>
       
    )
}


export default Homelayout;
