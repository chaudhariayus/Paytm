import AccountCheck from "../components/AccountCheck";
import Button from "../components/Button";
import Caption from "../components/Caption";
import { FirstName } from "../components/FirstName";
import Heading from "../components/Heading"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
export default function Signin(){
    const [username,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <div className='flex justify-center py-6 h-screen bg-slate-500'>
            <div className="grid grid-cols-1 rounded-sm shadow-sm p-6 w-80 text-center h-max bg-white mt-20">
                <div className="grid justify-items-center ">
                    <Heading title={"Sign In"}/>
                    <Caption title={"Enter your credentials to access your account "}/>
                </div>
                <FirstName title={"Email"} holdername={"johndoe@example.com"} onChange={(e)=>{setEmail(e.target.value)}}/>
                <FirstName title={"Password"} holdername={"123456"} onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username:username,
                            password:password
                        })
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }}label={"Sign In"}/>
                </div>
                <AccountCheck title={"Sign Up"} label={"Don't have an account?"} to={"/signup"}/>
            </div>
        </div>
    );
}