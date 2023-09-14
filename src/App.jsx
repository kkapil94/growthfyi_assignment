import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Report from "./components/Report";
import Header from "./components/Header";
import { ContextProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

function AppLayout() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Outlet />
      </ContextProvider>
    </>
  );
}

export default router;
