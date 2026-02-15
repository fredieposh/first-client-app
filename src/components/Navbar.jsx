function Navbar({ isAuth }) {
    return (
        <div className="flex bg-slate-900 items-center justify-between px-8 py-4 text-white">
            <div className="text-2xl font-bold">Science Blog</div>
            <div className="flex gap-3 text-md">
                {isAuth ?
                    <>
                        <span>Profile</span>
                        <span>Log Out</span>                        
                    </>:
                    <>
                        <span>Log In</span>
                        <span>Sign Up</span>
                    </>
                }
            </div>
        </div>
    )
};

export default Navbar;