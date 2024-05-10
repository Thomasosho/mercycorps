import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Footer from "../src/components/Footer";
import Nav from "../src/components/Nav";
import PageNotFound from "./pages/PageNotFound";

const Layout = () => {
  return (
    <>
      <Nav />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
