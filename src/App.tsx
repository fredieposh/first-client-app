import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Navbar from './components/Navbar'
import { API_URL } from './config'
import { handleResponse, handleLogout } from './utils'
import { User } from './utils';


function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => handleLogout({ setUser, setIsAuth, navigate });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage?.token}`
        },
        credentials:  'include',
      });
      const result = await response.json();
      handleResponse({result, setIsAuth, setUser, user, isAuth});
    };

    fetchData();
  }, [location.pathname])

  return (
    <div className='bg-slate-50 h-screen text-slate-900 flex flex-col overflow-hidden'>
      <Navbar isAuth={isAuth} onLogout={onLogout} user={user} />
      <main className="flex-1 min-h-0 overflow-auto">
        <Outlet context={{ user, isAuth }} />
      </main>
    </div>
  )
};

export default App
