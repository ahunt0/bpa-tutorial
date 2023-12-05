import React from "react";
import SidebarButton from "../Common/SidebarButton";
import { DashboardIcon, UsersIcon, LogsIcon, AssignmentsIcon, SettingsIcon, LogoutIcon } from "../Common/Icons";
import { Divider } from "@nextui-org/react";

export default function Sidebar() {
	return (
		<div className="dark h-screen w-1/6 bg-default-50 flex flex-col">
			<div className="mt-8 w-full flex flex-col justify-center items-center">
				<SidebarButton selected={true}>
					<DashboardIcon className="w-6" /> Dashboard
				</SidebarButton>
				<SidebarButton selected={false} className="mt-4">
					<UsersIcon className="w-6" /> Users
				</SidebarButton>
				<SidebarButton selected={false} className="mt-4">
					<AssignmentsIcon className="w-6" /> Assignments
				</SidebarButton>
				<SidebarButton selected={false} className="mt-4">
					<LogsIcon className="w-6" /> Logs
				</SidebarButton>
			</div>
			<div className="mt-auto p-4">
				<Divider className="my-4" />
				<p className="text-white flex">
					<SettingsIcon className="w-6 mr-2" /> Settings
				</p>
				<p className="text-white pt-4 flex">
					<LogoutIcon className="w-6 mr-2" /> Logout
				</p>
			</div>
		</div>
	);
}
