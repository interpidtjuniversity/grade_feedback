import {createBrowserRouter} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import StudentHome from "../pages/students/StudentHome";
import TeacherHome from "../pages/teachers/TeacherHome";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/studenthome",
        Component: StudentHome
    },
    {
        path: "/teacherhome",
        Component: TeacherHome
    }
])

export default router;