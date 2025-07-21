'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/src/contexts/auth-context"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import {
	Car,
	ChartBarStacked,
	ClipboardList,
	Cog,
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
import clsx from "clsx"

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
		if (url) router.push(url)
	}

	const items: MenuItem[] = [
		{
			title: "Home",
			url: "/home",
			icon: <Home size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,
		}, {
			title: "Opções",
			url: "/config",
			icon: <Cog size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,

		}, {
			title: "Novo veículo",
			url: "/new-vehicles",
			icon: <Car size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,

		}, {
			title: "Opcionais",
			url: "/optionals",
			icon: <ClipboardList size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,

		}, {
			title: "Cores",
			url: "/colors",
			icon: <Palette size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,

		}, {
			title: "Fabricantes",
			url: "/manufacturer",
			icon: <Factory size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,

		}, {
			title: "Categorias de Veículos",
			url: "/category-vehicles",
			icon: <ChartBarStacked size={23} strokeWidth={1.5} />,
			onClick: itemsWithUrl,
		}, {
			title: "Sair",
			icon: <LogOut size={23} strokeWidth={1.5} />,
			className: "mt-auto absolute bottom-5",
			onClick: logout,
		},
	];

	return <Sidebar className="bg-gradient-to-b from-white via-[#f8f9fc] to-[#eef1f6] border-r border-blue-100 shadow-inner">
		<SidebarContent>
			<SidebarGroup className="h-full">
				<SidebarGroupLabel className="text-[#464646] text-lg font-semibold mb-4">Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map(({ title, url, className, icon, onClick }) => <SidebarMenuItem key={title} className={className}>
							<SidebarMenuButton
								tooltip={title}
								onClick={() => onClick?.(url)}
								className={clsx(
									"flex items-center gap-3 px-4 py-2 text-[#464646] rounded-lg transition-all duration-200",
									"hover:bg-[#e6f0ff] hover:text-[#1d4ed8]",
								)}
							>
								<span className="flex items-center gap-3">{icon} {title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>)}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	</Sidebar>
}

export default function SidebarComponent() {
	const [open, setOpen] = useState<boolean>(false);

	return <SidebarProvider defaultOpen={false} open={open}
		onMouseEnter={() => setOpen(true)}
		onMouseLeave={() => setOpen(false)}
		className="relative w-1 border-2">
		<AppSidebar />
		<SidebarTrigger className="relative bg-[#464646] text-white" />
	</SidebarProvider>
}