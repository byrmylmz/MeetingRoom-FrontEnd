import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import RoomsList from "./components/rooms/roomsList";
import {Provider} from "react-redux";
import {store} from "./store";
import Root from "./routes/root";
import Integration from "./components/integration/integration";
import ScreenListByRoom from "./components/screens/screensListByRoom";
import ScreenIntegration from "./components/integration/screenIntegration";
import M365Redirect from "./components/integration/M365Redirect";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root/>,
        children: [

            {path: "/rooms", element: <RoomsList/>,},
            {path:"/rooms/:roomId/screens",element:<ScreenListByRoom/>},
            {path:"/rooms/:roomId/screens/:screenId/integration",element:<ScreenIntegration/>},
            {path:"/redirect",element:<M365Redirect/>},


            {path: "/Integration", element: <Integration/>,},

        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <ChakraProvider>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
