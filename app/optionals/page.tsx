"use client";

import React, { useState } from "react";
import SidebarComponent from "@/components/sidebar";
import PrivateRoute from "@/components/use-routes";
import FormOptional from "@/forms/form-optionals";
import FormOptionalCategory from "@/forms/form-optionals-category";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PageOptionals() {
	const [tab, setTab] = useState("opcional");

	return <PrivateRoute>
		<div className="flex w-full min-h-screen">
			<SidebarComponent />
			<Tabs value={tab} onValueChange={setTab} className="w-full flex justify-center items-center p-10 bg-white">
				<h1 className="text-5xl font-bold text-gray-800">Gerenciar Opcionais</h1>
				<TabsList className="grid lg:grid-cols-2 grid-cols-2 w-7xl mx-auto not-lg:h-max h-min space-x-5 gap-2">

					<TabsTrigger value="opcional" className="data-[state=active]:text-white w-full">
						Opcionais
					</TabsTrigger>
					<TabsTrigger value="categoria" className="data-[state=active]:text-white w-full">
						Categorias
					</TabsTrigger>

				</TabsList>
				<TabsContent value="opcional">
					<FormOptional />
				</TabsContent>
				<TabsContent value="categoria">
					<FormOptionalCategory />
				</TabsContent>
			</Tabs>
		</div>
	</PrivateRoute>
}
