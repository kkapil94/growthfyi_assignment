import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Report from "./components/Report";
import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        />
      </ContextProvider>
    </>
  );
}

export default router;
