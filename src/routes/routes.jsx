import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import About from "../pages/About";
import ProductSection from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import AuthRoutes from "./protectedRoutes/AuthRoutes";
import ProdutList from "../pages/ProdutList";
import AddProduct from "../pages/AddProduct";
import PremiumProduct from "../components/PermiumProduct";
import NormalProduct from "../components/NormalProduct";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "products",
                element: <ProductSection />
            },
            {
                path:"cart",
                element: <Cart />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path:"premium-product",
                element: <PremiumProduct />
            },
            {
                path: "normal-product",
                element: <NormalProduct />
            },
            {
                path: "contact",
                element: <Contact />
            },

            {
        path: "admin",
        element: <AuthRoutes />,
        children: [
          {
            path: "", // renders at /admin
            element: <ProdutList />,
          },
          {
            path:"add-product",
            element: <AddProduct />
          },
          {
            path: "profile",
            element: <Profile />
          }
        ],
      },
        ]
    },
]);