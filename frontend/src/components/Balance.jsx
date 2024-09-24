import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported

export function Balance() {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/account/balance`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setAmount(response.data.balance); 
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []); 

    return (
        <div className="m-4 flex items-center text-lg">
            <div className="font-bold">Your balance</div>
            <div className="ml-4 font-semibold">₹ {amount}</div> 
        </div>
    );
}
