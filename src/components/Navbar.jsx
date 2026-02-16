function Navbar({ isAuth }) {
    return (
        <div className="flex bg-slate-900 items-center justify-between px-8 py-4 text-white">
            <div className="text-2xl font-bold">Science Blog</div>
            <div className="flex gap-3 text-md">
                {isAuth ?
                    <>
                        <span className="hover:bg-white-900">Profile</span>
                        <span className="hover:bg-white-900">Log Out</span>                        
                    </>:
                    <>
                        <span className="px-4 py-2 hover:bg-white rounded-lg hover:text-slate-900 hover:cursor-pointer hover:scale-110 transition-all duration-600">Log In</span>
                        <span className="px-4 py-2 hover:bg-white rounded-lg hover:text-slate-900 hover:cursor-pointer hover:scale-110 transition-all duration-600">Sign Up</span>
                    </>
                }
            </div>
        </div>
    )
};

export default Navbar;