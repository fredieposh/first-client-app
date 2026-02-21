import App from './App.jsx'
import Posts from './components/Posts.jsx'
import Sign from './components/Sign.jsx'
import Login from './components/Login.jsx'
import ErrorPage from './components/ErrorPage.jsx'

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {index: true, element: <Posts />},
        {path: "/sign", element: <Sign />},
        {path: "/login", element: <Login />},
      ]
    },
  ];

  export default routes;