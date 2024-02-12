import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter, RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import Index from './pages/Test';
import One from './pages/One';
import Two from './pages/Two';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
	},
	{
		path: "/one",
		element: <One />,
	},
	{
		path: "/two",
		element: <Two />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)