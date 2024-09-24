import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import Button from "./Button";
import axios from "axios";

export function Users(){
    const [users,setusers]=useState([]);
    const [filter,setfilter]=useState("");
    //add debouncing
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/bulk?filter=${filter}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setusers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        fetchUsers();
    
        // Optional cleanup function
        return () => {
            setusers([]); // Cleanup: Reset users if component unmounts
        };
    }, [filter]);
    

    return (<div className="ml-4">
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="my-2">
            <input onChange={(e)=>{
                setfilter(e.target.value)
            }}className="w-full px-2 py-1 border rounded border-slate-200" placeholder="Search users..."></input>
        </div>
        <div className="mt-4">
            {users.map((user)=>{
               return <User key={user._id} user={user}/>
            })}
        </div>
    </div>)
}

function User({user}){
    const navigate =useNavigate();
    return <div className="flex justify-between mt-2 border rounded-md">
        <div className="flex items-center">
            <div className="bg-slate-200 flex justify-center mt-1 mr-2 rounded-full h-12 w-12 items-center">
                    <div className="text-xl">
                        {user.firstName[0].toUpperCase()}
                    </div>
            </div>
            <div className="text-xl flex items-center h-full">
                <div>{user.firstName}{" "}{user.lastName}</div>
            </div>
        </div>
         <div className="flex justify-center items-center">
            <Button onClick={(e)=>{
                navigate("/sendmoney?id="+user._id+"&name="+user.firstName);
            }}label={"Send Money"} />
        </div>
    </div>
}