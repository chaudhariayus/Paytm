import { Navigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMoney(){
    const [searchparams]=useSearchParams();
    const id=searchparams.get("id");
    const name=searchparams.get("name");
    const [amount,setamount]=useState(0);
    const navigate=useNavigate();

    return <div className="flex justify-center items-center h-screen bg-gray-200 ">
        <div className="grid grid-cols-1 rounded-sm h-max bg-white w-80 shadow-sm py-6 ">
            <div className="flex  justify-center text-center">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="px-6 pt-6">
                <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center rounded-full w-12 h-12 bg-green-500">
                        <div className="text-2xl text-white">{name[0].toUpperCase()}</div>
                    </div>
                    <div className="text-2xl font-semibold">{name}</div>
                </div>
            </div>
            <div className="px-6 pt-1 space-y-2">
                <label className="font-semibold" for="amount">Amount in (Rs)</label>
                <input onChange={(e)=>{
                    setamount(e.target.value)
                }}className="w-full border border-input rounded-md h-10 px-3 py-2" id="amount" type="number" placeholder="Enter amount">
                </input>
                
            </div>
            <div className="px-6 py-4">
            <button onClick={async()=>{
                const response =await axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to:id,
                    amount
                },{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                });
                alert("Transfer Successfull");
                navigate("/dashboard");
                
            }}className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                </button>
            </div>
            

        </div>
    </div>
}