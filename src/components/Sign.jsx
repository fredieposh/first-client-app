import { useState } from "react"

function Sign() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseType, setResponseType] = useState(null);
    const [responseData, setResponseData] = useState(null);

    return(
        <div className="flex justify-center mt-8" >
            <form   action="http://localhost:3000/login"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log(userName, password);
                        const response = await fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ username: userName, password }),
                        });
                        const result = await response.json();
                        setResponseType(response.status);
                        setResponseData(result);
                    }}
                    method="POST" 
                    className="flex flex-col items-center md:w-[40%]">
                {responseType && (
                    responseType >= 400 ?
                    <div className="mb-6">
                        <ul className="flex flex-col gap-2 items-center">
                            {responseData.map((error, index) => {
                                return <li key={index} className="bg-red-200 text-red-800 px-3 py-1 rounded-lg"><Error error={error}/></li>
                            })}
                        </ul>
                    </div> :
                    <div>Not Error </div>
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
                        autoFocus="true"
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
                    <button className="border-1 bg-slate-900 text-white border-slate-400 
                                        rounded-lg px-4 py-1 hover:bg-white hover:text-slate-900 
                                        hover:cursor-pointer transition-all duration-600" type="submit">Sign In</button>
                    <button className="border-1 bg-slate-900 text-white border-slate-400 
                                        rounded-lg px-4 py-1 hover:bg-white hover:text-slate-900 
                                        hover:cursor-pointer transition-all duration-600" type="submit">Back To Posts</button>
                </div>
            </form>
        </div>
    )
};

function Error({ error }) {
    return (
        <>
            {error.msg}
        </>
    )
};

export default Sign;