import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Blog from "./pages/Blogs";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import SingleService from "./pages/SingleService";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FooterAnimal from "./components/FooterAnimal";
import NavbarAnimal from "./components/NavbarAnimal";
import NavbarAdmin from "./components/NavbarAdmin";

import "./style.scss";


const Layout = ()=>{
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </> 
  )
}

const LayoutAnimal = ()=>{
  return (
    <>
      <NavbarAnimal/>
      <Outlet/>
      <FooterAnimal/>
    </> 
  )
}

const LayoutAdmin = ()=>{
  return (
    <>
      <NavbarAdmin/>
      <Outlet/>
      <FooterAnimal/>
    </> 
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAnimal/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/shop",
        element: <Shop/>
      },
      {
        path:"/service",
        element: <Services/>
      },
    ]
  },
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/posts",
        element:<Blog/>
      },
      {
        path: "/posts/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin/>,
    children:[
      {
        path:"/admin",
        element:<Admin/>
      },
      {
        path:"/admin/login",
        element:<AdminLogin/>
      },
      {
        path:"/admin/services/:id",
        element:<SingleService/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

function App() {
  return (    
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />   
      </div>      
    </div>
  );
}

export default App;
