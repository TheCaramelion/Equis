import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile/Profile';
import Explore from './pages/Explore/Explore';
import Signin from './pages/Signin/Signin';
import Signout from './pages/Signout/Signout';
import Error from './pages/Error/Error';

import Navbar from './components/Navbar/Navbar';
import { CookiesProvider } from 'react-cookie';

const Layout = () => {
  return(
    <div className='md:w-8/12 mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signout",
        element: <Signout />
      }
    ]
  }
])

function App() {
  return (
    <CookiesProvider>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </CookiesProvider>
  );
}

export default App;
