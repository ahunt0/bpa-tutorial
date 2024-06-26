import React from "react";
import SidebarButton from "../Common/SidebarButton";
import { DashboardIcon, UsersIcon, LogsIcon, AssignmentsIcon, SettingsIcon, LogoutIcon } from "../Common/Icons";
import { Divider } from "@nextui-org/react";
import { ReactComponent as Logo } from "../../Assets/Images/Logo.svg";

export default function Sidebar({ className, currentPage }) {
	return (
		<div className={`dark h-screen w-1/6 bg-default-50 flex flex-col ${className} left-0 top-0`}>
			<Logo className="fill-white h-12 mt-4" />
			<div className="mt-8 w-full flex flex-col justify-center items-center">
				<SidebarButton selected={currentPage === "dashboard"} to="/admin">
					<DashboardIcon className="w-6 mr-2" /> Dashboard
				</SidebarButton>
				<SidebarButton selected={currentPage === "users"} className="mt-4" to="/admin/users">
					<UsersIcon className="w-6 mr-2" /> Users
				</SidebarButton>
				<SidebarButton selected={currentPage === "courses"} className="mt-4" to="/admin/courses">
					<AssignmentsIcon className="w-6 mr-2" /> Courses
				</SidebarButton>
				<SidebarButton selected={currentPage === "logs"} className="mt-4" to="./">
					<LogsIcon className="w-6 mr-2" /> Logs
				</SidebarButton>
			</div>
			<div className="mt-auto p-4">
				<Divider className="my-4" />
				<p className="text-white flex hover:text-primary hover:cursor-pointer duration-200 ease-in-out">
					<SettingsIcon className="w-6 mr-2" /> Settings
				</p>
				<p className="text-white pt-4 flex hover:text-red-500 hover:cursor-pointer duration-200 ease-in-out">
					<LogoutIcon className="w-6 mr-2" /> Logout
				</p>
			</div>
		</div>
	);
}
