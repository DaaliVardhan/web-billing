import { createHashRouter } from "react-router"
import React, { Suspense } from "react"
import Loading from "./pages/Loading"

/* eslint-disable react-refresh/only-export-components */
const LazyApp = React.lazy(() => import("./pages/App"))
const LazyOrders = React.lazy(() => import("./pages/Orders"))
const LazyMenuPage = React.lazy(() => import("./pages/Menu"))
const LazySplashScreen = React.lazy(() => import("./pages/SplashScreen"))
const LazyErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const LazyInventory = React.lazy(() => import("./pages/Inventory"))
const LazySomethingWentWrong = React.lazy(
  () => import("./pages/SomethingWentWrong")
)

export const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: <LazySplashScreen />,
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyApp />
      </Suspense>
    ),
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "/orders",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyOrders />
      </Suspense>
    ),
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "/menus",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyMenuPage />
      </Suspense>
    ),
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "/inventory",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyInventory />
      </Suspense>
    ),
    errorElement: <LazySomethingWentWrong />,
  },
  {
    path: "*",
    element: <LazyErrorPage />,
  },
])
