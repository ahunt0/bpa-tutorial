import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./Components/Auth/LoginForm";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import Dashboard from "./Components/Admin/Dashboard";
import Users from "./Components/Admin/Users";
import UserEdit from "./Components/Admin/UserEdit";
import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<NextUIProvider>
		<Router>
			<AnimatePresence mode="wait" exit>
				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegistrationForm />} />
					<Route path="*" element={<UserEdit />} /> {/* temporary default route */}
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin" element={<Dashboard />} />
				</Routes>
			</AnimatePresence>
		</Router>
	</NextUIProvider>
);

reportWebVitals();
