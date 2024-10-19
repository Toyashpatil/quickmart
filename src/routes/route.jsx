import React from "react";
import Home from "../screens/Home";
import Landing1 from "../screens/Landing1";
import AuthWelcome from "../screens/AuthWelcome";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import Login from "../screens/Login";



const routes =[
    {
        path : "/",
        element: <Home/>,
    },
    {
        path : "/landing1",
        element: <Landing1/>,
    },
    {
        path : "/welcome",
        element:<AuthWelcome/>,
    },
    {
        path : "/home",
        element:<Home/>,
    },
    {
        path : "/prodet",
        element:<ProductDetails/>,
    },
    {
        path : "/cart",
        element:<Cart/>,
    },
    {
        path : "/login",
        element:<Login/>,
    },

];
export default routes;