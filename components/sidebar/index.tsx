'use client'

import React from "react"
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/src/contexts/auth-context"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import {
	Car,
	ChartBarStacked,
	ClipboardList,
	Factory,
	Home,
	LogOut,
	Palette
} from "lucide-react"

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

interface MenuItem {
	title: string
	url?: string
	className?: string
	icon: React.ReactElement
	onClick?: (url?: string) => void
}

export function AppSidebar() {
	const router = useRouter()
	const { logout } = useAuthContext()

	const itemsWithUrl = (url?: string) => {
		if (url) {
			router.push(url)
		}
	}

	const items: MenuItem[] = [
		{
			title: "Home",
			url: "/home",
			icon: <Home size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Veiculos",
			url: "/new-vehicles",
			icon: <Car size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Opcionais",
			url: "/optionals",
			icon: <ClipboardList size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Cores",
			url: "/colors",
			icon: <Palette size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Fabricantes",
			url: "/manufacturer",
			icon: <Factory size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Categorias de Veículos",
			url: "/category-vehicles",
			icon: <ChartBarStacked size={25} strokeWidth={2} />,
			onClick: itemsWithUrl,

		}, {
			title: "Sair",
			icon: <LogOut size={25} strokeWidth={2} />,
			className: "mt-auto absolute bottom-5",
			onClick: logout,
		},
	];

	return <Sidebar className="bg-white border-r border-blue-200 shadow-md ">
		<SidebarContent>
			<SidebarGroup className="h-full ">
				<SidebarGroupLabel className="text-[#464646] text-lg font-semibold mb-4">Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map(({ title, url, className, icon, onClick }) => <SidebarMenuItem key={title} className={className}>
							<SidebarMenuButton tooltip={title} className="flex items-center gap-3 h-auto text-[#464646] hover:bg-white p-2 rounded-md" onClick={() => onClick && onClick(url)}>
								<span className="text-md font-medium flex gap-5 items-center">{icon} {title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>)}
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