import React from "react";
import AdminBase from "./AdminBase";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";

export default function Users() {
	return (
		<AdminBase>
			<Table aria-label="User list">
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>1</TableCell>
						<TableCell>
							<User name="John Smith" description="jsmith11@gmail.com" />
						</TableCell>
						<TableCell>Teacher</TableCell>
					</TableRow>
					<TableRow key="2">
						<TableCell>2</TableCell>
						<TableCell>
							<User name="Jane Smith" description="jsmith51@gmail.com" />
						</TableCell>
						<TableCell>Teacher</TableCell>
					</TableRow>
					<TableRow key="3">
						<TableCell>3</TableCell>
						<TableCell>
							<User name="John Smith" description="jsmith11@gmail.com" />
						</TableCell>
						<TableCell>Teacher</TableCell>
					</TableRow>
					<TableRow key="4">
						<TableCell>4</TableCell>
						<TableCell>
							<User name="John Smith" description="jsmith11@gmail.com" />
						</TableCell>
						<TableCell>Teacher</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</AdminBase>
	);
}
