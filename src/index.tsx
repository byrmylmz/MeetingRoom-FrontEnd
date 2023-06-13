import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Design from "./Component/design";
import Integration from "./Component/integration";
import Room from "./Component/room";
import Players from "./Component/players";
import Settings from "./Component/settings";

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/design",
        element: <Design/>,
      },
      {
        path: "/integration",
        element: <Integration/>,
      },
      {
        path: "/room",
        element: <Room/>,
      },
      {
        path: "/settings",
        element: <Settings/>,
      },
      {
        path: "/players",
        element: <Players/>,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
