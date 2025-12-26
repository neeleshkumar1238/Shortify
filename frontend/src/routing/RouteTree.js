import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homePage.js"
import { authRoute } from "./authRoute.js"
import { dashboardRoute } from "./dashBoard.js"
import RootLayout from "../RootLayout"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree =rootRoute.addChildren([
    homePageRoute, 
    authRoute, 
    dashboardRoute
])