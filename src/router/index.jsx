import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import Root from "@/layouts/Root"
import Layout from "@/components/organisms/Layout"
import { getRouteConfig } from "@/router/route.utils"

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

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<div>Loading.....</div>}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

const mainRoutes = [
  createRoute({ index: true, element: <HomePage /> }),
  createRoute({ path: "category/:categoryName", element: <CategoryPage /> }),
  createRoute({ path: "product/:productId", element: <ProductDetailPage /> }),
  createRoute({ path: "cart", element: <CartPage /> }),
  createRoute({ path: "checkout", element: <CheckoutPage /> }),
  createRoute({ path: "wishlist", element: <WishlistPage /> }),
  createRoute({ path: "*", element: <NotFound /> })
]

const authRoutes = [
  createRoute({ path: "login", element: <Login /> }),
  createRoute({ path: "signup", element: <Signup /> }),
  createRoute({ path: "callback", element: <Callback /> }),
  createRoute({ path: "error", element: <ErrorPage /> }),
  createRoute({ path: "reset-password/:appId/:fields", element: <ResetPassword /> }),
  createRoute({ path: "prompt-password/:appId/:emailAddress/:provider", element: <PromptPassword /> })
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