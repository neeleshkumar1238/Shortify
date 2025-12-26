import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree.js";
import HomePage from "../pages/HomePage";


export const homePageRoute=createRoute({
    getParentRoute:()=>rootRoute,
    path: '/',  
    component: HomePage,
})
