import React, { useEffect, useState } from "react";
import { Card, CardHeader, Skeleton } from "@nextui-org/react";
import { UserGroupIcon, UserPlusIcon } from "../Common/Icons";
import AdminBase from "./AdminBase";
import axios from "axios";

// const SkeletonLoader = () => (
// 	<Card className="p-4 w-96">
// 		<CardHeader>
// 			<div className="flex flex-col text-default-800">
// 				<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
// 					<UserGroupIcon className="w-8 text-red-500" />
// 				</div>
// 				<p className="text-md font-semibold text-default-500/80 mb-4">Total Users</p>
// 				<p className="text-3xl font-bold tracking-tighter">{totalUsers}</p>
// 			</div>
// 		</CardHeader>
// 	</Card>
// );

export default function Dashboard() {
	const [totalUsers, setTotalUsers] = useState(0);
	const [newUsersToday, setNewUsersToday] = useState(0);

	useEffect(() => {
		const fetchData = async (url, setData) => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/admin/users/${url}`);
				setData(response.data.total || response.data.usersCountToday);
			} catch (error) {
				console.error(`Error fetching ${url}:`, error);
			}
		};

		fetchData("total", setTotalUsers);
		fetchData("today", setNewUsersToday);
	}, []);

	return (
		<AdminBase>
			<div className="flex justify-center space-x-8">
				<Card className="p-4 w-96">
					<CardHeader>
						<div className="flex flex-col text-default-800">
							<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
								<UserGroupIcon className="w-8 text-red-500" />
							</div>
							<p className="text-md font-semibold text-default-500/80 mb-4">Total Users</p>
							<p className="text-3xl font-bold tracking-tighter">{totalUsers}</p>
						</div>
					</CardHeader>
				</Card>
				{/* <Card className="p-4 w-96">
					<CardHeader>
						<div className="flex flex-col text-default-800">
							<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
								<UserGroupIcon className="w-8 text-red-500" />
							</div>
							<p className="text-md font-semibold text-default-500/80 mb-4">Active Users</p>
							<p className="text-3xl font-bold tracking-tighter">2</p>
						</div>
					</CardHeader>
				</Card> */}
				<Card className="p-4 w-96">
					<CardHeader>
						<div className="flex flex-col text-default-800">
							<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
								<UserGroupIcon className="w-8 text-red-500" />
							</div>
							<Skeleton className="rounded-lg mb-8">
								<div className="w-20 h-4 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg w-12">
								<div className="w-12 h-6 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
					</CardHeader>
				</Card>
				<Card className="p-4 w-96">
					<CardHeader>
						<div className="flex flex-col text-default-800">
							<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
								<UserPlusIcon className="w-8 text-red-500" />
							</div>
							<p className="text-md font-semibold text-default-500/80 mb-4">New Users</p>
							<div className="relative flex">
								<p className="text-3xl font-bold tracking-tighter relative">{newUsersToday}</p>
								<p className="text-sm font-semibold pb-2 pl-1">today</p>
							</div>
						</div>
					</CardHeader>
				</Card>
			</div>
		</AdminBase>
	);
}
