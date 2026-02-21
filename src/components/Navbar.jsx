import { Link } from 'react-router'

const linkStyle = "px-4 py-2 hover:bg-white rounded-lg hover:text-slate-900 hover:cursor-pointer hover:scale-110 transition-all duration-600";

function Navbar({ isAuth, onLogout }) {
    return (
        <div className="flex bg-slate-900 items-center justify-between px-8 py-4 text-white">
            <div className="text-2xl font-bold"><Link to="/">Science Blog</Link></div>
            <div className="flex gap-3 text-md">
                {isAuth ?
                    <>
                        <span className={linkStyle}>Profile</span>
                        <span className={linkStyle} onClick={onLogout}>Log Out</span>
                    </>:
                    <div>
                        <Link to="/login" className={linkStyle}>Log In</Link>
                        <Link to="/sign" className={linkStyle}>Sign Up</Link>
                    </div>
                }
            </div>
        </div>
    )
};

export default Navbar;