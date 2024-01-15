import axios from "axios";
import { createAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

export const SIGNUP_SUCCESS="SIGNUP_SUCCESS";
export const SIGNUP_FAILURE="SIGNUP_FAILURE";

export const createAccount=(userData)=>async(dispatch)=>{

try{
    const response=await axios.post("/api/signup",userData);
    dispatch({type:SIGNUP_SUCCESS,
      payload:response.data
    });
}catch(error){
        dispatch({type:SIGNUP_FAILURE,
          payload:error.message
        });

}
};

//export const signinUser = createAction('user/signin');
//export const signoutuser = createAction('user/signout'); 


export const signinUser = createAction('user/signin', (userdata) => {
  // Here, you can perform custom logic, such as API calls or data processing
  return {
    payload: userdata, 
  };
});



export const signoutuser = createAction('user/signout', () => {
  // Here, you can perform custom sign-out logic, such as clearing data
  return {
    payload: null, 
  };
});



export const logout=()=>(dispatch)=>{
    dispatch({type:'logout'});
};