import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/HomePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: HomePage,
    },
  ],
  {
    basename: "/Portfoliowebsitedesign/",
  }
);
