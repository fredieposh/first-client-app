import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Navbar from './components/Navbar.jsx'
import { handleResponse, handleLogout } from './utils.jsx'


function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => handleLogout({ setUser, setIsAuth, navigate });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage?.token}`
        },
      });
      const result = await response.json();
      handleResponse({result, setIsAuth, setUser, user, isAuth});
    };

    fetchData();
  }, [location.pathname])

  return (
    <div className='bg-slate-50 min-h-screen text-slate-900'>
      <Navbar isAuth={isAuth} onLogout={onLogout} />
      <Outlet />
    </div>
  )
};

export default App
