import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SurveyList from "./components/SurveyList.tsx";
import Survey from "./components/Survey.tsx";
import News from "./components/News.tsx";
import Caemera from "./components/Camera.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/news",
		element: <News />,
	},
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/surveys",
		element: <SurveyList />,
	},
	{
		path: "/surveys/:survey_id",
		element: <Survey />,
	},
	{
		path: "/camera",
		element: <Caemera />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
