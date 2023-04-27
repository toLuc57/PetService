import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Blogs/Single";
import Write from "./pages/Blogs/Write";
import Blog from "./pages/Blogs/Blogs";
import Shop from "./pages/Shop/Shop";
import Services from "./pages/Services/Services";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FooterAnimal from "./components/FooterAnimal";
import NavbarAnimal from "./components/NavbarAnimal";

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
