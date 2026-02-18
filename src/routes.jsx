import App from './App.jsx'
import Posts from './components/Posts.jsx'
import Sign from './components/Sign.jsx'

const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element: <Posts />},
        {path: "/sign", element: <Sign />},
      ]
    },
  ];

  export default routes