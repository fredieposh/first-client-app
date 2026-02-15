function Navbar({ isAuth }) {
    return (
        <div>
            <div>Science Blog</div>
            <div>
                {isAuth ?
                    <>
                        <span>Profile</span>
                        <span>Log Out</span>                        
                    </>:
                    <>
                        <span>Log In</span>
                        <span>Sign UP</span>
                    </>
                }
            </div>
        </div>
    )
};

export default Navbar;