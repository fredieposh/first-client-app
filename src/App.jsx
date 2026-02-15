import { useState, useEffect } from 'react'

import Navbar from './Navbar.jsx'

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/posts");
      const result = await response.json();

      console.log(result);
      if (result.isAuth) {
        setIsAuth(true);
      };
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar isAuth={ isAuth }></Navbar>
      <p>Operation Done</p>
    </div>
  )
};

export default App
