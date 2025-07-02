"use client";

import React, { useState } from "react";
import SidebarComponent from "@/components/sidebar";
import PrivateRoute from "@/components/use-routes";
import FormOptional from "@/forms/form-optionals";
import FormOptionalCategory from "@/forms/form-optionals-category";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PageOptionals() {
	const [tab, setTab] = useState("opcional");

	return (
		<PrivateRoute>
			<div className="flex w-full min-h-screen">
				<SidebarComponent />

				<div className="flex flex-col items-center justify-center flex-1 px-6 py-10 bg-gray-50">
					<div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
						<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
							Gerenciar Opcionais
						</h1>
						<Tabs value={tab} onValueChange={setTab} className="w-full">
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
				</div>
			</div>
		</PrivateRoute>
	);
}
