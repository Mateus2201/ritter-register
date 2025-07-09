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
				<TabsList className="flex justify-center gap-4 h-min w-full max-w-4xl bg-gray-100 p-2 rounded-lg mb-6">
					<TabsTrigger value="categoria" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-4 py-2 rounded-md">
						Categorias
					</TabsTrigger>
					<TabsTrigger value="opcional" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-4 py-2 rounded-md">
						Opcionais
					</TabsTrigger>
				</TabsList>
				<TabsContent value="categoria">
					<FormOptionalCategory />
				</TabsContent>
				<TabsContent value="opcional">
					<FormOptional />
				</TabsContent>

			</Tabs>
		</div>
	</PrivateRoute>
}
