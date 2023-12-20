import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import { Card, CardBody, Skeleton, Input, RadioGroup, Radio } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserEdit() {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/admin/user/${id}`);
				setUser(response.data.user);
			} catch (error) {
				if (error.response && error.response.status === 404) {
					setError(`User with the ID of ${id} not found`);
				} else {
					console.error("Error fetching user:", error);
				}
			}
		};

		fetchUser();
	}, [id]); // Add id as a dependency to the useEffect hook

	return (
		<AdminBase>
			<div className="justify-center space-x-8">
				<Card className="p-4">
					<CardBody>
						<div>
							{user ? (
								<div className="">
									<div className="flex space-x-4 my-4">
										<Input label="First Name" value={user.FirstName} />
										<Input label="Last Name" value={user.LastName} />
									</div>
									<Input label="Email" value={user.Email} className="mb-4" />
									<RadioGroup label="Role" value={user.Access} orientation="horizontal" className="mb-4">
										<Radio value="student">Student</Radio>
										<Radio value="teacher">Teacher</Radio>
										<Radio value="admin">Admin</Radio>
									</RadioGroup>
									<Input
										label="Registration Date"
										value={new Date(user.RegistrationDate).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
										className="mb-6"
									/>
									<p className="absolute bottom-0 right-0 text-sm text-default-500">ID • {user.UserID}</p>
								</div>
							) : error ? (
								<p>{error}</p>
							) : (
								<p>Loading...</p>
							)}
						</div>
					</CardBody>
				</Card>
			</div>
		</AdminBase>
	);
}
