import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "../ui/button"
import React from "react"

interface MenuItem {
	title: string
	url: string
	className?: string
	icon: React.ElementType
}

export function AppSidebar() {

	const items: MenuItem[] = [
		{
			title: "Home",
			url: "#",
			icon: Home,
		},
		{
			title: "Opcionais",
			url: "#",
			icon: Inbox,
		},
		{
			title: "Veiculos",
			url: "#",
			icon: Calendar,
		},
		{
			title: "Sair",
			url: "#",
			icon: LogOut,
			className: "mt-auto absolute bottom-5",
		},
	]

	return <Sidebar>
		<SidebarContent>
			<SidebarGroup className="border-0 h-full">
				<SidebarGroupLabel>Application</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map(({ title, url, className, icon }) => (
							<SidebarMenuItem key={title} className={className} >
								<SidebarMenuButton tooltip={title} className="flex items-center gap-2">
									{/* <Link href={url}> */}
										{React.createElement(icon)}
										<span>{title}</span>
									{/* </Link> */}
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	</Sidebar>
}

export default function SidebarComponent() {
	return <SidebarProvider className="absolute text-primary w-0 border-2">
		<AppSidebar />
		<SidebarTrigger />
	</SidebarProvider>
}