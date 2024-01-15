import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

//this array holds the list of all the lectures
// const initialState={
//     lectures:[]
// }



export const getcourselectures=createAsyncThunk(
    "/course/lecture/get",async(cid)=>{
 
    try{
         console.log("Fetching lectures for course:", cid);
        const response=axiosInstance.get(`"/courses",${cid}`);
        toast.promise(response,{
            loading:'fetching course lectures',
            success:"Lecture fetched successfully",
            error:'Failed to load the lectures'
        });
        return await response.data;
    }catch(error){
         console.error("Error fetching lectures:", error);
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const addcourselectures=createAsyncThunk(
    "/course/lecture/add",async(data)=>{
 
    try{
        const response=axiosInstance.post(`/courses/${data.id}`,FormData);
        toast.promise(response,{
            loading:'adding course lectures',
            success:"Lecture added successfully",
            error:'Failed to add the lectures'
        });
        return await response.data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

export const deletecourselectures=createAsyncThunk(
    "/course/lecture/delete",async(data)=>{
 
    try{
        const response=axiosInstance.delete(`"/courses?courseid=${data.courseid}&lectureid=${data.lectureid}`);
        toast.promise(response,{
            loading:'deleting course lectures',
            success:"Lecture deleted successfully",
            error:'Failed to delete the lectures'
        });
        return await response.data;
    }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

const lectureSlice=createSlice({
    name:"lecture",
    initialState:{
         lectures:[],
    },
    reducers:{
    setLectures: (state, action) => {
      state.lectures = action.payload || [];
    },
    },
    extraReducers:(builder)=>{
        builder
         .addCase(getcourselectures.pending, (state, action) => {
        console.log("getcourselectures.pending", action);
        // You can handle loading state if needed
      })
      .addCase(getcourselectures.rejected, (state, action) => {
        console.log("getcourselectures.rejected", action);
        // You can handle error state if needed
      })
      .addCase(getcourselectures.fulfilled, (state, action) => {
        console.log("getcourselectures.fulfilled", action);
        console.log(action);
        state.lectures = action?.payload?.lectures || [];
      })
         .addCase(addcourselectures.fulfilled,(state,action)=>{
            console.log("addcourselectures.fulfilled", action);
            console.log(action);
            state.lectures=action?.payload?.course?.lectures;
        })
    }
});

export default lectureSlice.reducer;