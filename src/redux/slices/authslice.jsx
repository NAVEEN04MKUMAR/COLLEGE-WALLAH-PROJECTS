

import { createAsyncThunk,createSlice, isFulfilled} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";
import { signupAPI,getuserdataAPI } from "../mockapi";
//import { signinaction } from "../../action/authactions";

// const initialState={
//     isloggedin:localStorage.getItem("isloggedin")||false,
//     role:localStorage.getItem("role")||"",
//     date:localStorage.getItem("date")||{},
//     accountCreationSuccess:false,
//     successmessage:'',
// }

export const login=createAsyncThunk(
    "/auth/login",
    async(data)=>{
 
    try{
        const response=axiosInstance.post("user/login",data);
        toast.promise(response,{
            loading:'wait!create your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to create your account'
        });
        return await response.data;
    }catch(error){
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

export const logout=createAsyncThunk(
    "/auth/logout",
    async()=>{
 
    try{
        const response=axiosInstance.post("user/logout");
        toast.promise(response,{
            loading:'wait!logging out your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to logout your account'
        });
        return await response.data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

// const registeredusers = [];
const userDataKey = 'userData';
const readUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem(userDataKey);
  return storedData ? JSON.parse(storedData) : {};
};

function readUserData() {
  const storedData = localStorage.getItem(userDataKey);
  return storedData ? JSON.parse(storedData) : [];
}

function writeUserData(userData) {
  localStorage.setItem(userDataKey, JSON.stringify(userData));
}



// console.log('Before simulateregistration call:', formdata);
function simulateregistration(formdata) {
  const userData = readUserData();
    console.log('request receiver:',formdata);
  const userexists = userData.some((user) => user.email === formdata.get(email));

  if (userexists) {
    return {
      success: false,
      message: 'Account with this email already exists',
    };
  }

  const newUser = { email: formdata.get('email') };
  userData.push(newUser);
  writeUserData(userData);

  return {
    success: true,
    message: 'User registered successfully',
  };
}

export const createAccount = createAsyncThunk('auth/createAccount', async(formdata) => {
// formdata.preventDefault();
  console.log('Data received in auth.jsx:', Array.from(formdata.entries()));;

//  try{
        //server endpoint constructed by the data[0] is the userid and the data[1] using the formdata
  const response = simulateregistration(formdata);
    console.log('formdata recived at the auth.js', response);
    console.log('Success:', response.success);
    console.log('Message:', response.message);

try{
        //   toast.promise(response,{
        //     loading:'Wait! creating  your account',
        //     success:()=>{
        //         console.log(response.message);
        //         //return the data from the server response
        //         return response.message;
        //     },
        //     error:'Failed to create your account',
        // });
        if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
  // You can update localStorage after successful registration if needed
    if (response.success) {
      const userDataFromLocalStorage = readUserDataFromLocalStorage();
      userDataFromLocalStorage[Date.now()] = formdata.get('email'); // Use a timestamp as the key
      localStorage.setItem(userDataKey, JSON.stringify(userDataFromLocalStorage));
    }
        return response;
}
catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        }
        
    // if (response.success) {
    //   toast.success(response.message);
    //   return response.userdata; // Return userdata for success
    // } else {
    //   toast.error(response.message);
    // }
    // }catch(error){
    //     console.log(error);
    //     toast.error(error?.response?.data?.message);
    });

// Retrieve all data in localStorage
const allDataFromLocalStorage = readUserDataFromLocalStorage();
console.log('Data from localStorage:', allDataFromLocalStorage);


export const updateprofile=createAsyncThunk("/auth/updateprofile",async(data)=>{
    try{
        //server endpoint constructed by the data[0] is the userid and the data[1] using the formdata
        const response=axiosInstance.put(`/user/update${data[0]}`,data[1]);
        toast.promise(response,{
            loading:'Wait! updating your account',
            success:(data)=>{
                console.log(data);
                //return the data from the server response
                return data?.data?.message;
            },
            error:'Failed to update your account',
        });
        return (await response).data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const getuserdata=createAsyncThunk("/auth/getdata",async()=>{
    try{
        const response=axiosInstance.get("/user/me");
        return (await response).data;

    //       const response=await getuserdataAPI();
    // return await response; 

    }catch(error){
        // toast.error(error?.message);
            throw error;

    }
})

export const signinaction = createAsyncThunk("auth/signin", async (userdata,{dispatch}) => {
  try {
    //onst response = await axiosInstance.post("user/signin", userdata);
    //return response.data;
    const response=await signupAPI(userdata);

     if (response.success) {
      const role = response.user?.role || 'ADMIN';
      dispatch(signinsuccess({ role }));
    }
    return await response; 
  } catch (error) {
    throw error;
      
  }
});

const authslice=createSlice({
    name:"auth",
    initialState:{
    isloggedin:localStorage.getItem("isloggedin")||false,
    role:localStorage.getItem("role")||"",
    date:localStorage.getItem("date")||{},
    accountCreationSuccess:false,
    successmessage:'',
    accountCreationError:false,
    error:'',
    user: null, 
  data: {},
},
    reducers:{
        clearsuccess:(state)=>{
            state.accountCreationSuccess=false;
            state.successmessage='';
        },
        signinsuccess: (state, action) => {
          state.isloggedin = true;
      state.role = action.payload.role;
         },
    },
     extraReducers:(builder)=>{
        builder
        .addCase(signinaction.fulfilled,(state,action)=>{
        console.log(action);
        localStorage.setItem("data",JSON.stringify(action?.payload?.data))
        localStorage.setItem("isloggedin",true);
        localStorage.setItem("role",action?.payload?.data?.user?.role);
        
        state.isloggedin=true;
        state.data=action?.payload?.user;
        state.role=action?.payload?.user?.role;
        })
        .addCase(signinaction.rejected, (state, action) => {
       console.error("Sign-in failed:", action.error.message);
        })
            //  .addCase(login.fulfilled,(state)=>{
        .addCase(logout.fulfilled,(state)=>{        
            localStorage.clear();
        
            state.isloggedin=false;
        state.role="";
        state.data={};
        })
        .addCase(getuserdata.fulfilled,(state,action)=>{
            if(!action?.payload?.user)
            return;
        localStorage.setItem("data",JSON.stringify(action?.payload?.user));
        localStorage.setItem("isloggedin",true);
        localStorage.setItem("role",action?.payload?.user);
        
        state.isloggedin=true;
        state.role=action?.payload?.user?.role;
        state.data=action?.payload?.user;
        })
      .addCase(createAccount.fulfilled, (state, action) => {
        const response=action.payload;
        console.log("response",response)
        
        if (response.success) {
             state.accountCreationSuccess = true;
             state.successmessage='account created successfully';
        
             state.user={
              email:response.email,
              fullname:response.fullname,
             };
            //state.user = action.payload.user;
            // state.data = action.payload.user;
        }else{
          state.accountCreationError=true;
          state.error=response.message;
        }
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.accountCreationError = true;
        state.successmessage = action.error.message;
  //       state.accountCreationSuccess = false;
  //         state.error=action.error.message;
  // state.successmessage = 'Failed to create an account';
      })
    }
    })
       
 export const {signinsuccess,clearsuccess}=authslice.actions;
export default authslice.reducer;







// export const createAccount=createAsyncThunk("/auth/signup",async(formdata)=>{
//     try{
//         const userdata=formdata;
//         //const response=await signupAPI(formdata);
//      //   const response=await axiosInstance.post("user/register",formdata);
//         // toast.promise(response,{
//         //     loading:'wait!create your account',
//         //     success:(data)=>{
//         //         return data?.data?.message;
//         //     },
//         //     error:'Failed to create your account'
//         // });
//         const response=await signupAPI(userdata);
//         return await response;
//     }catch(error){
//         console.log(error);
//         toast.error(error?.response?.data?.message);
//         throw error;
//     }
// })


// export const createAccount = createAsyncThunk(
//   'auth/createAccount',
//   async (userdata) => {
//      console.log('Data received in createAccount:', userdata);
//     try{
//     const response = await mockregisteruser(userdata);
//     return response;
//   }catch(error){
//     throw error;
//   }
// }
// );


// // Define a simple user data structure for simulation
// const registeredusers = [];


// function mockregisteruser(userdata) {
//   console.log('request receiver:',userdata);
//   const userexists = registeredusers.some((user) => user.email === userdata.email);

//   if (userexists) {
//     console.log('email already exist:',userdata.email);
//     return {
//       success: false,
//       message: 'Account with this email already exists',
//     };
//   }
//   registeredusers.push(userdata);
//   console.log('user registered successfully',`Key: ${key}, Value: ${value}`);
//   return {
//     success: true,
//     message: 'User registered successfully',
//   };
// }
// console.log('All registered users:', registeredusers);

// const useremailaccess = 'naveen54mkumar@gmail.com';
// const user = registeredusers.find((user) => user.email === useremailaccess);
// if (user) {
//   console.log('Details of user:', user);
// } else {
//   console.log('User not found with the specified email:', useremailaccess);
// }


// async function mockregisteruser(userdata) {
//     try{
//    console.log('Request:', JSON.stringify(userdata));

//   const response = await fetch('http://localhost:3000/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userdata),
//   });
    
//   if (response.ok) {
//     //console.log('Response:', JSON.stringify(response));
//     //return { success: true, message: 'User registered successfully' };
//     const data = await response.json();
//     console.log('Success:', data);
//   } else {
//     const data = await response.json();
//     console.log('Error Response:', data.message || 'Failed to register user');
//     throw new Error(errordata.message || 'Failed to register user');
//     //return { success: false, message: data.message || 'Failed to register user' };
//   }
  
// }
// catch (error) {
//     console.error('Error:', error);
//   }
// }


