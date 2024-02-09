import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import {Provider} from "react-redux";
import {store} from "./store";
import Root from "./routes/root";
import RoomList from "./features/RoomList";
import ScreenList from "./features/ScreenList/ScreenList";
import M365Redirect from "./components/integration/M365Redirect";
import ScreenIntegration from "./components/integration/ScreenIntegration";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root/>,
        children: [
            {index: true, path: "/rooms", element: <RoomList/>,},
            {path:"/rooms/:roomId/screens",element:<ScreenList/>},
            {path:"/rooms/:roomId/screens/:screenId/integration",element:<ScreenIntegration/>},
            {path:"/redirect",element:<M365Redirect/>},

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
