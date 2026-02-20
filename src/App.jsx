import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navbar from './components/Navbar.jsx'


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  console.log(location.state);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/users");
      const result = await response.json();

      console.log(result);
      if (result.isAuth && !isAuth) {
        setIsAuth(true);
      };
    };

    fetchData();
  }, []);

  return (
    <div className='bg-slate-50 min-h-screen text-slate-900'>
      <Navbar isAuth={ isAuth }></Navbar>
      <Outlet />
    </div>
  )
};

export default App
