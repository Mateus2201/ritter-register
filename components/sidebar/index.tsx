'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Car, ClipboardList, Factory, Home, Inbox, LogOut, Palette, Search, Settings } from "lucide-react"

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
import { useRouter } from 'next/navigation'


interface MenuItem {
	title: string
	url: string
	className?: string
	icon: React.ElementType
}

export function AppSidebar() {
	const Router = useRouter();

	const items: MenuItem[] = [
		{
			title: "Home",
			url: "/home",
			icon: Home,
		}, {
			title: "Veiculos",
			url: "/vehicles",
			icon: Car,
		}, {
			title: "Opcionais",
			url: "/optionals",
			icon: ClipboardList,
		}, {
			title: "Cores",
			url: "/colors",
			icon: Palette,
		}, {
			title: "Fabricantes",
			url: "/manufacturer",
			icon: Factory,
		}, {
			title: "Sair",
			url: "#",
			icon: LogOut,
			className: "mt-auto absolute bottom-5",
		},
	];

	return <Sidebar className="bg-white border-r border-blue-200 shadow-md">
		<SidebarContent>
			<SidebarGroup className="h-full">
				<SidebarGroupLabel className="text-blue-700 text-lg font-semibold mb-4">Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map(({ title, url, className, icon }) => (
							<SidebarMenuItem key={title} className={className}>
								<SidebarMenuButton
									tooltip={title}
									className="flex items-center gap-3 text-blue-900 hover:bg-blue-100 p-2 rounded-md"
									onClick={() => Router.push(url)}
								>
									{React.createElement(icon, { className: "w-5 h-5" })}
									<span className="text-sm font-medium">{title}</span>
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
	return <SidebarProvider className="absolute w-0 border-2">
		<AppSidebar />
		<SidebarTrigger />
	</SidebarProvider>
}