import { createHashRouter } from "react-router"
import React from "react"

const LazyApp = React.lazy(() => import("./pages/App"))
const LazyOrders = React.lazy(() => import("./pages/Orders"))
const LazyMenuPage = React.lazy(() => import("./pages/Menu"))
const LazySplashScreen = React.lazy(() => import("./pages/SplashScreen"))
const LazyErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const LazySomethingWentWrong = React.lazy(() => import("./pages/SomethingWentWrong"))


export const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: <LazySplashScreen />,
  },
  {
    path: "/home",
    element: <LazyApp />,
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "/orders",
    element: <LazyOrders />,
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "/menus",
    element: <LazyMenuPage />,
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "*",
    element: <LazyErrorPage />,
  },
])
