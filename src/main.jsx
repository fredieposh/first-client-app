import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Posts from './components/Posts.jsx'
import Sign from './components/Sign.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <Posts />},
      {path: "/sign", element: <Sign />},
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)