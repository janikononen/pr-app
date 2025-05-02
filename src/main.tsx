import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerlistPage from "./pages/CustomerlistPage.tsx";
import TraininglistPage from "./pages/TraininglistPage.tsx";
import TrainingCalendarPage from "./pages/TrainingCalendarPage.tsx";
import TrainingChartPage from "./pages/TrainingChartPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <TraininglistPage />,
        index: true,
      },
      {
        path: "customerlist",
        element: <CustomerlistPage />,
      },
      {
        path: "trainingsCalendar",
        element: <TrainingCalendarPage />,
      },
      { path: "trainingsChart", element: <TrainingChartPage /> },
      {},
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
