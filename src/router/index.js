import {createBrowserRouter} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/home",
        Component: Home
    }
])

export default router;