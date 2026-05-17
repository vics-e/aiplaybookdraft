import { createBrowserRouter } from "react-router";
import SageAIPlaybook from "./SageAIPlaybook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SageAIPlaybook,
  },
  {
    path: "*",
    Component: SageAIPlaybook,
  },
]);