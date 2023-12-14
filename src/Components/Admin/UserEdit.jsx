import React from "react";
import AdminBase from "./AdminBase";
import { Card, CardHeader, Skeleton } from "@nextui-org/react";

export default function Dashboard() {
	return (
		<AdminBase>
			<div className="flex justify-center space-x-8">
				<Card className="w-1/2">
					<CardHeader>Username</CardHeader>
				</Card>
			</div>
		</AdminBase>
	);
}
