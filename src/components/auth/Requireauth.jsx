import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom";


function Requireauth({allowedroles}){

const {isloggedin,role}=useSelector((state)=>state.auth);
return isloggedin&&allowedroles.find((myrole)=>myrole==role)?(
<Outlet/>

):
isloggedin?(<Navigate to="denied "/>):(<Navigate to="/login"/>)
}
export default Requireauth;