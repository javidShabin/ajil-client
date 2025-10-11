import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import About from "../pages/About";
import ProductSection from "../pages/Products";
import Cart from "../pages/Cart";


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
            }
        ]
    },
]);