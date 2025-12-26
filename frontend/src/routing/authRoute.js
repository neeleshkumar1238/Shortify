import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree.js";
import AuthPage from "../pages/AuthPage.jsx";

export const authRoute=createRoute({
    getParentRoute:()=>rootRoute,
    path: '/auth',  
    component: AuthPage,
})