import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const SignUp = lazy(() => import("../pages/auth/register/sign-up"));
const Saved = lazy(() => import('../pages/saved-posts/Saved'));

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  signUp: "/auth/register",
  saved: "/savedPosts",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.login,
    component: Login,
  }, {
    path: paths.signUp,
    component: SignUp,
  },
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.saved,
    component: Saved,
  },
];
