import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { handleButtonClick, handleSubmit } from "../utils"
import { API_URL } from "../config"

interface ErrorProps {
    error: {msg: string};
}

function Sign() {
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseType, setResponseType] = useState<number | null>(null);
    const [responseData, setResponseData] = useState< {msg: string}[] | null>(null);

    useEffect(() => {
        if(responseType && responseType < 400) {
            navigate("/", {state: {message: "Sign up successful!"}});
        }
    }, [responseType])
    
    const buttonClassName = "border-1 bg-slate-900 text-white border-slate-400 rounded-lg px-4 py-1 hover:bg-white hover:text-slate-900 hover:cursor-pointer transition-all duration-600";

    return(
        <div className="flex justify-center mt-8" >
            <form   action={`${API_URL}/users`}
                    onSubmit={(e) => handleSubmit(e, `${API_URL}/users`, { userName, password, setResponseType, setResponseData })}
                    method="POST" 
                    className="flex flex-col items-center md:w-[40%]">
                {(responseType != null && responseType >= 400) && (
                    <div className="mb-6">
                        <ul className="flex flex-col gap-2 items-center">
                            {responseData?.map((error, index) => {
                                return <li key={index} className="bg-red-200 text-red-800 px-3 py-1 rounded-lg"><Error error={error}/></li>
                            })}
                        </ul>
                    </div>
                )}
                <div className="flex justify-center w-full"><h3 className="font-bold text-2xl text-center" >Sign Up</h3></div>
                <div className="mt-10 flex w-[100%]  justify-center">
                    <label className="w-35" htmlFor="username">Enter Username:</label>
                    <input
                        className="border-1 border-slate-400 rounded-lg w-[40%] pl-2"
                        type="text"
                        id="username"
                        name="username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus={true}
                    />
                </div>
                <div className="mt-10 flex w-[100%] justify-center">
                    <label className="w-35" htmlFor="password">Enter Password:</label>
                    <input
                        className="border-1 border-slate-400 rounded-lg w-[40%] pl-2"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-10 flex w-[100%] justify-center gap-4">
                    <button 
                        className={buttonClassName} 
                        type="submit">Sign Up
                    </button>
                    <button 
                    className={buttonClassName} 
                    type="button" 
                    onClick={(e) => handleButtonClick(e, "/", navigate)}>Back To Posts
                    </button>
                </div>
            </form>
        </div>
    )
};

function Error({ error }: ErrorProps) {
    return (
        <>
            {error.msg}
        </>
    )
};

export  { Error };
export default Sign;