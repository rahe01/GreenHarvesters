import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import WeOfferSingle from "../pages/Outlet/WeOffer/WeOfferSingle";
import ProjectSingle from "../pages/Outlet/Project/ProjectSingle";
import Contact from "../pages/Home/Contact/Contact";
import WeOffer from "../pages/Home/WeOffer/WeOffer";
import Project from "../pages/Home/Project/Project";
import About from "../pages/Home/About/About";
import Blogs from "../pages/Home/Blogs/Blogs";
import AddBlogs from "../pages/Outlet/AddBlogs/AddBlogs";
import PrivateRoute from "./PrivateRoute";
import Blog from "../pages/Outlet/Blog/Blog";
import Shop from "../pages/Shop/Shop";
import DefaultLayout from "../layouts/DefaultLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import Calender from "../pages/Dashboard/Common/Calender";
import MyBlogs from "../pages/Dashboard/Common/MyBlogs/MyBlogs";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddFood from "../pages/Dashboard/Saller/Food/AddFood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/services",
        element: <WeOffer></WeOffer>,
      },
      {
        path: "/projects",
        element: <Project></Project>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/addBlogs",
        element: (
          <PrivateRoute>
            <AddBlogs></AddBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/:id",
        element: <Blog></Blog>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/getblogbyid/${params.id}`),
      },
      {
        path: "/offer/:id",
        element: <WeOfferSingle></WeOfferSingle>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/getofferbyid/${params.id}`),
      },
      {
        path: "/projects/:id",
        element: <ProjectSingle></ProjectSingle>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/getprojectbyid/${params.id}`),
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DefaultLayout></DefaultLayout>
      </PrivateRoute>
    ),
    children: [
      {path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'calendar',
        element: <Calender></Calender>
      },
      {
        path: 'myaddedblogs',
        element: <MyBlogs></MyBlogs>
      },
      {
        path: 'addBlogs',
        element: (
          <PrivateRoute>
            <AddBlogs></AddBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: 'manageusers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'addfood',
        element: <AddFood></AddFood>
      }
    ]
  },
]);
