import { useState } from "react";
import AccountCheck from "../components/AccountCheck";
import Button from "../components/Button";
import Caption from "../components/Caption";
import { FirstName } from "../components/FirstName";
import Heading from "../components/Heading"
import { useNavigate } from "react-router-dom";
import axios from "axios"


export function Signup(){
    const [firstName,setfirstname]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <div className='flex justify-center py-6 h-screen bg-slate-500'>
            <div className="grid grid-cols-1 rounded-sm shadow-sm p-6 w-80 text-center h-max bg-white">
                <div className="grid justify-items-center ">
                    <Heading title={"Sign Up"}/>
                    <Caption title={"Enter your information to create an account"}/>
                </div>
                <FirstName title={"First Name"} holdername={"John"} onChange={(e)=>{setfirstname(e.target.value)}}/>
                <FirstName title={"Last Name"} holdername={"Doe"} onChange={(e)=>{setLastName(e.target.value)}}/>
                <FirstName title={"Email"} holdername={"johndoe@example.com"} onChange={(e)=>{setEmail(e.target.value)}}/>
                <FirstName title={"Password"} holdername={"123456"} onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="pt-4 ">
                    <Button label={"Sign Up"} onClick={async ()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard")
                    }}/>
                </div>
                <AccountCheck title={"Login"} label={"Already have an account?"} to={"/signin"}/>
            </div>
        </div>
    );
}