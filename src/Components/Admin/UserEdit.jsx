import React, { useEffect, useState } from "react";
import AdminBase from "./AdminBase";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
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
			<div className="flex justify-center space-x-8">
				<Card className="w-3/4">
					<CardBody>
						<div>
							{user ? (
								<div>
									<h1>
										{user.FirstName} {user.LastName}
									</h1>
									<p>Email: {user.Email}</p>
									<p>
										Registration Date: {new Date(user.RegistrationDate).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
									</p>
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
