import { Link } from 'react-router'
import { User } from '../utils';

interface NavbarProps {
    isAuth: boolean;
    onLogout: () => void;
    user: User | null;
}

const linkStyle = "px-4 py-2 hover:bg-white rounded-lg hover:text-slate-900 hover:cursor-pointer hover:scale-110 transition-all duration-600";

function Navbar({ isAuth, onLogout, user }: NavbarProps) {
    return (
        <div className="flex bg-slate-900 items-center justify-between px-8 py-4 text-white">
            <div className="text-2xl font-bold"><Link to="/">Science Blog</Link></div>
            <div className="flex gap-3 text-md">
                {isAuth ?
                    <>
                        <Link to={`http://localhost:5174/users/${user!.id}/posts`} className={linkStyle}>Profile</Link>
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