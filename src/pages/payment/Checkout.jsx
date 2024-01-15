import {useEffect} from "react";
import toast from "react-hot-toast";
import {BiRupee} from "react-icons/bi";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
//import { loadConfigFromFile } from "vite";

import Homelayout from "../../layout/Homelayout";
import { getrazorpayid,purchasecoursebundle,verifyuserpayment } from "../../redux/slices/RazorpaySlice";

function Checkout(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const razorpaykey=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);

    const paymentdetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:"",
    }
    async function handlesubscription(event){
        event.preventDefault();
        if(!razorpaykey||!subscription_id){
            toast.error("something went wrong");
            return;
        }

const option={
    key:razorpaykey,
    subscription_id:subscription_id,
    name:"courses.pvt ltd",
    description:"subscription",

    helper:async function(response){
        paymentdetails.razorpay_payment_id=response.razorpay_payment_id;
        paymentdetails.razorpay_subscription_id=response.razorpay_subscription_id;
        paymentdetails.razorpay_signature=response.razorpay_signature;

toast.success("paymentsuccessfull");
        const res=await dispatch(verifyuserpayment(paymentdetails));
    console.log("res on checkout",res);
    res?.payload?.success?navigate("/checkout/success"):navigate("/checkout/failure");
    }
};

const paymentactions=new window.razorpay(option);
paymentactions.open();

}

async function load(){
    await dispatch(getrazorpayid());
    await dispatch(purchasecoursebundle());
}
useEffect (()=>{
    load();
},[]);

return(
    <Homelayout>
        <form onsubmit={handlesubscription}
        className="min-h-[90vh] flex items-center justify-center text-white">
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-yellow-500 absolute text-center top-0 w-full text-center py-4 text-2xl font-bold rounded-tr-lg">Subscription Bundle</h1>
                <div className="px-4 space-y-5 text-center">

                    <p className="text-[17px]">
                        This purchase will allow you to access to all available course of our platform for {" "}
                        <span className="text-yellow-500 font-bond">
                            <br/>
                            1 Year duration
                        </span>{" "}

                        All the existing and new launched courses wil lbe also availble
                    </p>

<p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /><span>499</span> only
                        </p>

                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>

                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                            Buy now
                        </button>
                </div>
            </div>
        </form>
    </Homelayout>

);
}

export default Checkout;
