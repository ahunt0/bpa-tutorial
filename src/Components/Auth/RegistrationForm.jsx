import React, { useState } from "react";
import { Input, Button, Divider, Checkbox } from "@nextui-org/react";
import AuthBase from "./AuthBase";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function RegistrationForm() {
	// Register api call
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		// confirmPassword: "",
	});

	const navigate = useNavigate();
	const [error, setError] = useState(null);

	// Form submission
	const handleChange = (e, fieldName) => {
		const { value } = e.target;
		setUser((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`http://localhost:3001/api/v1/auth/register`, user);
			console.log(response.data);

			if (response.data.success) {
				// If successful, redirect to login page
				navigate("/login", { state: { message: "User created successfully" } });
			}
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
	const [value, setValue] = React.useState("");

	const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isInvalid = React.useMemo(() => {
		if (value === "") return false;

		return validateEmail(value) ? false : true;
	}, [value]);

	return (
		<AuthBase>
			<motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.3 }}>
				<div className="ml-4 pt-4">
					<h1 className="text-4xl font-bold mb-4">Register</h1>
					<div className="mb-4">
						<p className="text-xl mb-4 text-default-600">
							Please register to access <span className="text-primary-500">PLACEHOLDER</span>
						</p>
						{error && <p className="text-red-500">{error}</p>}
					</div>
					<div className="flex flex-col items-center justify-center md:items-start md:justify-start mr-4">
						<form onSubmit={handleSubmit}>
							<div className="flex gap-4">
								<Input type="text" label="First Name" isRequired className="mb-4" value={user.firstName} onChange={(e) => handleChange(e, "firstName")} />
								<Input type="text" label="Last Name" isRequired className="mb-4" value={user.lastName} onChange={(e) => handleChange(e, "lastName")} />
							</div>
							<Input
								type="email"
								label="Email"
								isRequired
								variant={isInvalid ? "bordered" : "flat"}
								errorMessage={isInvalid && "Please enter a valid email"}
								isInvalid={isInvalid}
								onValueChange={(newValue) => {
									setValue(newValue);
									setUser((prev) => ({ ...prev, email: newValue }));
								}}
								value={value}
								className="mb-4"
							/>{" "}
							<Input type="password" label="Password" isRequired className="mb-4" value={user.password} onChange={(e) => handleChange(e, "password")} />
							<Input type="password" label="Confirm Password" isRequired className="mb-4" />
							<Checkbox color="primary" className="mb-4">
								I agree to the{" "}
								<Link to="#" className="text-primary-500 hover:text-primary-600 ease-in-out duration-400 underline underline-offset-4">
									terms and conditions
								</Link>
							</Checkbox>
							<Button color="primary" variant="shadow" className="w-full font-bold" type="submit">
								Register
							</Button>
						</form>
						<Divider className="my-4" />
						<p className="text-center">
							Already have an account?{" "}
							<Link to="/login" className="text-primary-500 hover:text-primary-600 ease-in-out duration-400">
								Login here.
							</Link>
						</p>
					</div>
				</div>
			</motion.div>
		</AuthBase>
	);
}
