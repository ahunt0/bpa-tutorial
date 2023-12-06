import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { UserGroupIcon } from "../Common/Icons";

export default function Dashboard() {
	return (
		<div className="bg-white h-full w-full rounded-md">
			<div className="p-10 relative">
				{/* User Icon */}

				<div className="flex space-x-4">
					<Card className="p-4 w-96">
						<CardHeader>
							<div className="flex flex-col text-default-800">
								<div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500/20 rounded-full p-2">
									<UserGroupIcon className="w-8 text-red-500" />
								</div>
								<p className="text-md font-semibold text-default-500/80 mb-4">Total Users</p>
								<p className="text-3xl font-bold tracking-tighter">1023</p>
							</div>
						</CardHeader>
						{/* <CardBody>Card Body</CardBody>
                        <CardFooter>Card Footer</CardFooter> */}
					</Card>
				</div>
			</div>
		</div>
	);
}
