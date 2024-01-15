// App.js
import React from "react";
import {Route,Routes} from 'react-router-dom'

import Home from './src/pages/Home.jsx'
import Homelayout from "./src/layout/Homelayout.jsx";
import Footer from "./src/components/Footer.jsx"
import Aboutus from "./src/pages/Aboutus.jsx";
import Signin from "./src/pages/Signin.jsx";
import Signup from "./src/pages/Signup.jsx";
import Contact from "./src/pages/Contact.jsx";
import Denied from "./src/pages/Denied.jsx";
import Courselist from "./src/pages/courses/Courselist.jsx";
//import { logout } from "./action/authactions";
import "./src/styles/Tailwind.css";
import Coursedescription from "./src/pages/courses/Coursedescription.jsx";
import Createcourse from "./src/pages/courses/Createcourse.jsx";
import Profile from "./src/pages/user/Profile.jsx"
import Requireauth from "./src/components/auth/Requireauth.jsx"
import Editprofile from "./src/pages/user/Editprofile.jsx";
import Checkout from "./src/pages/payment/Checkout.jsx";
import Checkoutsuccess from "./src/pages/payment/Checkousuccess.jsx";
import Checkoutfailure from "./src/pages/payment/Checkoutfailure.jsx";
import Addlecture from "./src/pages/dashboard/Addlecture.jsx";
import Displaylecture from "./src/pages/dashboard/displaylectures.jsx";
import GitHubFileViewer from "./src/pages/dashboard/getvideo.jsx";

//import TestComponent from "./TestComponent"; // Adjust the import path  // <TestComponent />     
// import PrivateRoute from "./pages/Privateroute";

function App() {
  return (
    <Homelayout>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="/footer" element={<Footer />}/>
      <Route path ="/about" element={<Aboutus/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/denied" element={<Denied/>}/>
      <Route path="/courselist" element={<Courselist/>}/>
      <Route path="/courselist/coursedescription" element={<Coursedescription/>}/>
      <Route path="/course/addlecture" element={<Addlecture/>}/> 
      <Route path="/course/get" element={<Displaylecture/>}/>
      <Route path="/video/get" element={<GitHubFileViewer/>}/>



<Route element={<Requireauth allowedroles={["ADMIN","USER"]}/>}>
        <Route path="profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<Editprofile/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/checkout/success" element={<Checkoutsuccess/>}/>
        <Route path="/checkout/failure" element={<Checkoutfailure/>}/>
</Route>

<Route element ={<Requireauth allowedroles={["ADMIN"]}/>}>
        {/* <Route path="/course/create" element={<Createcourse/>}/> */}
        {/* <Route path="/course/addlecture" element={<Addlecture/>}/> */}
</Route>

    </Routes>
</Homelayout>
); 
}  


export default App;

// {/* //  <div className="App">
// // </div>   
// // ); */}


