import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile/Profile';
import Explore from './pages/Explore/Explore';
import Signin from './pages/Signin/Signin';
import Signout from './pages/Signout/Signout';

import Navbar from './components/Navbar/Navbar';

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
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
