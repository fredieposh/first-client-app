import { useState, useEffect } from 'react'

import Navbar from './components/Navbar.jsx'
import Posts from './components/Posts.jsx'
import Sign from './components/Sign.jsx';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/users");
      const result = await response.json();

      console.log(result);
      if (result.isAuth) {
        setIsAuth(true);
      };
    };

    fetchData();
  }, []);

  return (
    <div className='bg-slate-50 min-h-screen text-slate-900'>
      <Navbar isAuth={ isAuth }></Navbar>
      <Sign></Sign>
    </div>
  )
};

export default App
