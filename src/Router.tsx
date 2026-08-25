import { createHashRouter } from "react-router"
import SplashScreen from "./pages/SplashScreen"
import App from "./pages/App"
import Orders from "./pages/Orders"
import ErrorPage from "./pages/ErrorPage"
import SomethingWentWrong from "./pages/SomethingWentWrong"
import Menu from "./pages/Menu"

export const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: <SplashScreen />,
  },
  {
    path: "/home",
    element: <App />,
    errorElement: <SomethingWentWrong />,
  },
  {
    path: "/orders",
    element: <Orders />,
    errorElement: <SomethingWentWrong />,
  },
  {
    path: "/menus",
    element: <Menu />,
    errorElement: <SomethingWentWrong />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
])
