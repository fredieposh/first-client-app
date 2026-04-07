import App from './App'
import Posts from './components/Posts'
import Sign from './components/Sign'
import Login from './components/Login'
import ErrorPage from './components/ErrorPage'
import { RouteObject } from 'react-router'

const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {index: true, element: <Posts />},
        {path: "/sign", element: <Sign />},
        {path: "/login", element: <Login />},
        {path: "/post/:id", element: <Posts />},
      ]
    },
  ];

  export default routes;