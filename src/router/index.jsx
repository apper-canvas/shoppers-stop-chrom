import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import Root from "@/layouts/Root"
import Layout from "@/components/organisms/Layout"

const HomePage = lazy(() => import("@/components/pages/HomePage"))
const CategoryPage = lazy(() => import("@/components/pages/CategoryPage"))
const ProductDetailPage = lazy(() => import("@/components/pages/ProductDetailPage"))
const CartPage = lazy(() => import("@/components/pages/CartPage"))
const CheckoutPage = lazy(() => import("@/components/pages/CheckoutPage"))
const WishlistPage = lazy(() => import("@/components/pages/WishlistPage"))
const Login = lazy(() => import("@/components/pages/Login"))
const Signup = lazy(() => import("@/components/pages/Signup"))
const Callback = lazy(() => import("@/components/pages/Callback"))
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"))
const ResetPassword = lazy(() => import("@/components/pages/ResetPassword"))
const PromptPassword = lazy(() => import("@/components/pages/PromptPassword"))
const NotFound = lazy(() => import("@/components/pages/NotFound"))

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <HomePage />
      </Suspense>
    )
  },
  {
    path: "category/:categoryName",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <CategoryPage />
      </Suspense>
    )
  },
  {
    path: "product/:productId",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ProductDetailPage />
      </Suspense>
    )
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <CartPage />
      </Suspense>
    )
  },
  {
    path: "checkout",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <CheckoutPage />
      </Suspense>
    )
  },
  {
    path: "wishlist",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <WishlistPage />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    )
  }
]

const authRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Login />
      </Suspense>
    )
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Signup />
      </Suspense>
    )
  },
  {
    path: "callback",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Callback />
      </Suspense>
    )
  },
  {
    path: "error",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ErrorPage />
      </Suspense>
    )
  },
  {
    path: "reset-password/:appId/:fields",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ResetPassword />
      </Suspense>
    )
  },
  {
    path: "prompt-password/:appId/:emailAddress/:provider",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <PromptPassword />
      </Suspense>
    )
  }
]

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: mainRoutes
      },
      ...authRoutes
    ]
  }
]
export const router = createBrowserRouter(routes);