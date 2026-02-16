import { useState } from "react"

function Sign() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="flex justify-center mt-8" >
            <form action="http://localhost:3000/login" method="POST" className="flex flex-col items-start md:w-[40%]">
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
                    <button className="border-1 bg-slate-900 text-white border-slate-400 rounded-lg px-4 py-1 hover:bg-white hover:text-slate-900 hover:cursor-pointer transition-all duration-600" type="submit">Sign In</button>
                    <button className="border-1 bg-slate-900 text-white border-slate-400 rounded-lg px-4 py-1 hover:bg-white hover:text-slate-900 hover:cursor-pointer transition-all duration-600" type="submit">Back To Posts</button>
                </div>
            </form>
        </div>
    )
};

export default Sign;