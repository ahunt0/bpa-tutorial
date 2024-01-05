import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import { Card, CardBody, Skeleton, Input, RadioGroup, Radio, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToastNotification from "../Common/ToastNotification";

export default function UserEdit() {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		FirstName: "",
		LastName: "",
		Email: "",
		Access: "",
	});

	const [showToast, setShowToast] = useState(false);

	const showToastMessage = () => {
		setShowToast(true);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/admin/user/${id}`, { withCredentials: true });
				setUser(response.data.user);

				if (response.data.user) {
					const { FirstName, LastName, Email, Access } = response.data.user;
					setFormData({
						FirstName: FirstName || "",
						LastName: LastName || "",
						Email: Email || "",
						Access: Access || "",
					});
				}
			} catch (error) {
				setError("User not found");
			}
		};

		fetchUser();
	}, [id]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.put(`http://localhost:3001/api/v1/admin/user/edit/${id}`, formData, { withCredentials: true });

			showToastMessage();
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	return (
		<AdminBase>
			<div className="justify-center space-x-8">
				<Card className="p-4">
					<CardBody>
						<form onSubmit={handleSubmit}>
							<div>
								{user ? (
									<div className="">
										<div className="flex space-x-4 my-4">
											<Input label="First Name" name="FirstName" value={formData.FirstName} onChange={handleInputChange} />
											<Input label="Last Name" name="LastName" value={formData.LastName} onChange={handleInputChange} />
										</div>
										<Input label="Email" name="Email" value={formData.Email} onChange={handleInputChange} className="mb-4" />
										<RadioGroup label="Role" name="Access" value={formData.Access} onValueChange={(value) => setFormData({ ...formData, Access: value })} orientation="horizontal" className="mb-4">
											<Radio value="student">Student</Radio>
											<Radio value="teacher">Teacher</Radio>
											<Radio value="admin">Admin</Radio>
										</RadioGroup>
										<Input
											label="Registration Date"
											value={new Date(user.RegistrationDate).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
											className="mb-6"
											isDisabled
										/>
										<Button type="submit" color="primary" variant="shadow">
											Save
										</Button>
										<p className="absolute bottom-0 right-0 text-sm text-default-500">UID • {user.UserID}</p>
									</div>
								) : error ? (
									<p>{error}</p>
								) : (
									<p>Loading...</p>
								)}
							</div>
						</form>
					</CardBody>
				</Card>
			</div>
			{showToast && <ToastNotification message="Saved successfully" onClose={() => setShowToast(false)} />}
		</AdminBase>
	);
}
