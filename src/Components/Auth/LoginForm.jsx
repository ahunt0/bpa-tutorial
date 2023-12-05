import React, { useState } from "react";
import { Input, Button, Divider, Checkbox } from "@nextui-org/react";
import AuthBase from "./AuthBase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ForgotPassModal from "./ForgotPassModal";
import axios from "axios";

export default function LoginForm() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState(null);

	const handleChange = (e, fieldName) => {
		const { value } = e.target;
		setUser((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`http://localhost:3001/api/v1/auth/login`, user);
			console.log(response.data);
			// Handle success or any other actions
		} catch (error) {
			console.error("Error submitting form:", error);
			// Handle error
			if (error.response && error.response.data && error.response.data.message) {
				// If there's a message in the error response, set it as an error message for the user
				setError(error.response.data.message);
			} else {
				// Handle other error scenarios
				setError("An unknown error occurred. Please try again later.");
			}
		}
	};

	// Email Validation
	const [value, setValue] = useState("");

	const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isInvalid = React.useMemo(() => {
		if (value === "") return false;

		return validateEmail(value) ? false : true;
	}, [value]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const onOpen = () => {
		setIsModalOpen(true);
	};
	return (
		<AuthBase>
			<motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.3 }}>
				<div className="ml-4 pt-4">
					<h1 className="text-4xl font-bold mb-4">Login</h1>
					<div className="mb-4">
						<p className="text-xl mb-4 text-default-600">
							Welcome to <span className="text-primary-500">PLACEHOLDER</span>
						</p>
						{error && <p className="text-red-500">{error}</p>}
					</div>
					<div className="md:w-96">
						<form onSubmit={handleSubmit}>
							<Input
								type="email"
								label="Email"
								className="mb-4"
								variant={isInvalid ? "bordered" : "flat"}
								errorMessage={isInvalid && "Please enter a valid email"}
								isInvalid={isInvalid}
								value={value}
								onValueChange={(newValue) => {
									setValue(newValue);
									setUser((prev) => ({ ...prev, email: newValue }));
								}}
								isRequired
							/>
							<Input type="password" label="Password" className="mb-4" value={user.password} onChange={(e) => handleChange(e, "password")} isRequired />
							<div className="flex items-center justify-between">
								<Checkbox color="primary">Remember me</Checkbox>
								<p className="text-primary-500 hover:text-primary-600 ease-in-out duration-400 hover:cursor-pointer" onClick={onOpen}>
									Forgot password?
								</p>
							</div>
							<Button color="primary" variant="shadow" className="w-full mt-4 font-bold" type="submit">
								Login
							</Button>
						</form>
						<Divider className="my-4" />
						<p className="text-center">
							Don't have an account?{" "}
							<Link to="/register" className="text-primary-500 hover:text-primary-600 ease-in-out duration-400">
								Register here.
							</Link>
						</p>
					</div>
				</div>
			</motion.div>
			<ForgotPassModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</AuthBase>
	);
}
