import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./Components/Auth/LoginForm";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import Dashboard from "./Components/Admin/Dashboard";
import Users from "./Components/Admin/Users";
import UserEdit from "./Components/Admin/UserEdit";
import Courses from "./Components/Admin/Courses";
import CourseEdit from "./Components/Admin/CourseEdit";
import Assignments from "./Components/Admin/Assignments";
import AssignmentEdit from "./Components/Admin/AssignmentEdit";
import Assignment from "./Components/Student/Assignment";
import StudentCourses from "./Components/Student/StudentCourses";
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
					{/* Admin Routes */}
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/user/:id" element={<UserEdit />} />
					<Route path="/admin" element={<Dashboard />} />
					<Route path="/admin/courses" element={<Courses />} />
					<Route path="/admin/course/:id" element={<CourseEdit />} />
					<Route path="/admin/assignments/:id" element={<Assignments />} />
					<Route path="/admin/assignment/:id" element={<AssignmentEdit />} />
					{/* Student Route */}
					<Route path="/student" element={<StudentCourses />} />
					<Route path="/student/assignment/" element={<Assignment />} />
				</Routes>
			</AnimatePresence>
		</Router>
	</NextUIProvider>
);

reportWebVitals();
