import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import routes from './routes'

const params = new URLSearchParams(window.location.search);
if (params.get('logout') === 'true') {
  localStorage.removeItem('token');
  window.history.replaceState({}, '', '/');
};
  
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)