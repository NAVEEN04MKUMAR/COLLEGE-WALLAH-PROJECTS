import { createAsyncThunk,createSlice, isFulfilled} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
//import { useDispatch } from "react-redux";

import axiosInstance from "../../config/axiosInstance";

const initialState={
    courselist:[],
    coursedata:{
        name:"",
        description:"",
        thumbnailurl:"",
    },
};


export const getallcourses=createAsyncThunk(
    "/coursegetallcourses",async(data)=>{
 
    try{
        const response=axiosInstance.get("/courses",data);
        toast.promise(response,{
            loading:'wait!fetching all courses',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to create your account'
        });
        return await response.data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})


export const createnewcourses=createAsyncThunk(
    "/course/create",async(data)=>{
 
    try{
let formdata=new FormData();
formdata.append("title",data?.title);
formdata.append("description",data?.description);
formdata.append("catagory",data?.category);
formdata.append("createdby",data?.createdby);
formdata.append("thumbnail",data?.thumbnail);


        const response=axiosInstance.post("/courses",formdata);
        toast.promise(response,{
            loading:'wait!creating new course',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to create course'
        });
        return (await response).data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

const courseslice=createSlice({
name:"course",
initialState,
 reducers:{},
 extraReducers:(builder)=>{
         builder.addCase(getallcourses.fulfilled,(state,action)=>{
            console.log(action.payload)
          if(action?.payload){
             state.courselist=[...action.payload];
          }
        });
      },


});

//export const {addcourse}=courseslice.actions;
export default courseslice.reducer;




