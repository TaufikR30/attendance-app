import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Layout from "./components/Layout";
import Guard from "./components/AuthGuard";
import Absence from "./pages/absence";
import Employees from "./pages/employee";
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/employees" replace /> },
      {
        path: "employees",
        element: (
          <Guard>
            <Employees />
          </Guard>
        ),
      },
      {
        path: "absence",
        element: (
          <Guard>
            <Absence />
          </Guard>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
