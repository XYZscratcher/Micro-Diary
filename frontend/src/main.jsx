import React from 'react'
import {createRoot} from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import './style.css'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    /*{
        path:"/app/",
        element: <h1>aaaaa</h1>,
    }*/
]);
//<RouterProvider router={router} />
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
