import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState={
    key:"",
    subscription_id:"",
    ispaymentverified:false,
    allpayments:{},
    finalmonths:{},
    monthlysalesrecord:[]
}



export const getrazorpayid=createAsyncThunk("/razorpay/getid",async()=>{
    try{
        const response=await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    }catch(error){
        toast.error("failed to load data");
    }
})




export const purchasecoursebundle=createAsyncThunk("/purchasecourse",async()=>{
    try{
        const response=await axiosInstance.post("/payments/subscribe");
        console.log(response);
        return response.data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const verifyuserpayment=createAsyncThunk("/payments/verify",async(data)=>{
    try{
        const response=await axiosInstance.post("/payments/verify",{
            rezorpay_payment_id:data.rezorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});



export const getpaymentrecord=createAsyncThunk("/payment/record",async()=>{
    try{
        const response=await axiosInstance.get("/payments?count=100",);
toast.promise(response,{
    loading:"getting the payment records",
    success:(data)=>{
        return data?.data?.message
    },
    error:"failed to get payment records"
})    
        console.log(response);
        return await response.data;
    }catch(error){
        toast.error("operation failed");
    }
});


const razorpayslice =createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extrareducers:(builder)=>{
        builder
        .addCase(getrazorpayid.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
        })

         .addCase(purchasecoursebundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        
         .addCase(verifyuserpayment.fulfilled,(state,action)=>{
            console.log(action);
            toast.success(action?.payload?.message);
            state.ispaymentverified=action?.payload?.success;
        })

         .addCase(verifyuserpayment.rejected,(state,action)=>{
            console.log(action);
            toast.success(action?.payload?.message);
            state.ispaymentverified=action?.payload?.success;
        })

        .addCase(getpaymentrecord.fulfilled,(state,action)=>{
            state.allpayments=action?.payload?.allpayments;
            state.finalmonths=action?.payload?.finalmonths;
            state.monthlysalesrecord=action?.payload?.monthlysalesrecord;

        })

    }
});
export default razorpayslice.reducer;














