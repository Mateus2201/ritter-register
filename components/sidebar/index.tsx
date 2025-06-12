'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Car, ChartBarStacked, ClipboardList, Factory, Home, Icon, Inbox, LogOut, Palette, Search, Settings } from "lucide-react"

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
	icon: React.ReactElement
}

export function AppSidebar() {
	const Router = useRouter();

	const items: MenuItem[] = [
		{
			title: "Home",
			url: "/home",
			icon: <Home size={25} strokeWidth={2} />,
		}, {
			title: "Veiculos",
			url: "/vehicles",
			icon: <Car size={25} strokeWidth={2} />,
		}, {
			title: "Opcionais",
			url: "/optionals",
			icon: <ClipboardList size={25} strokeWidth={2} />,
		}, {
			title: "Cores",
			url: "/colors",
			icon: <Palette size={25} strokeWidth={2} />,
		}, {
			title: "Fabricantes",
			url: "/manufacturer",
			icon: <Factory size={25} strokeWidth={2} />,
		}, {
			title: "Categorias de Veículos",
			url: "/category-vehicles",
			icon: <ChartBarStacked size={25} strokeWidth={2} />,
		}, {
			title: "Sair",
			url: "#",
			icon: <LogOut size={25} strokeWidth={2} />,
			className: "mt-auto absolute bottom-5",
		},
	];


	return <Sidebar className="bg-white border-r border-blue-200 shadow-md ">
		<SidebarContent>
			<SidebarGroup className="h-full ">
				{/* <SidebarTrigger className="relative bg-[#464646] text-amber-50" /> */}

				<SidebarGroupLabel className="text-[#464646] text-lg font-semibold mb-4">Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map(({ title, url, className, icon }) => (
							<SidebarMenuItem key={title} className={className}>
								<SidebarMenuButton
									tooltip={title}
									className="flex items-center gap-3 h-auto text-[#464646] hover:bg-white p-2 rounded-md"
									onClick={() => Router.push(url)}
								>
									<span className="text-md font-medium flex gap-5 items-center">{icon} {title}</span>
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
		<SidebarTrigger className="relative bg-[#464646] text-white" />
	</SidebarProvider>
}