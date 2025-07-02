"use client";

import React, { useEffect, useState } from "react";
import Vehicle from "@/types/Vehicle";
import { useVehicle } from "@/hooks/use-vehicle";
import Link from "next/link";
import {
    Calendar1,
    ClipboardList,
    Fuel,
    Gauge,
    Loader,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwiperImages from "@/components/swiper-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Stock() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [loader, setLoader] = useState(false);
    const [tab, setTab] = useState("all");
    const { getAllVehicle } = useVehicle();

    useEffect(() => {
        getAllVehicle().then((data) => {
            setVehicles(data);
            setFilteredVehicles(data);
        });
    }, []);

    useEffect(() => {
        let filtered = vehicles;

        if (tab === "blindado") filtered = vehicles.filter(v => v.armored);
        if (tab === "troca") filtered = vehicles.filter(v => v.allowsTrade);
        if (tab === "disponivel") filtered = vehicles.filter(v => !v.sold);

        setFilteredVehicles(filtered);
    }, [tab, vehicles]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    🚘 Estoque de Veículos
                </h1>

                {/* Filtros em Tabs */}
                <Tabs value={tab} onValueChange={setTab} className="mb-8 flex justify-center">
                    <TabsList className="grid grid-cols-4 w-full not-lg:h-max h-min space-x-5 gap-2">
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="all">Todos</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="blindado">Blindados</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="troca">Aceita troca</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="disponivel">Disponíveis</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Grade de Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredVehicles.map((vehicle) => (
                        <div
                            key={vehicle.idVehicle}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1 flex flex-col"
                        >
                            <div className="h-64 w-full relative">
                                <SwiperImages id={vehicle.idVehicle} />
                                {vehicle.sold ? (
                                    <Badge className="absolute top-4 left-4 bg-red-600 text-white">Vendido</Badge>
                                ) : null}
                                {vehicle.featured && !vehicle.sold ? (
                                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">Destaque</Badge>
                                ) : null}
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-xl font-bold text-gray-800">{vehicle.model}</h2>
                                        <p className="text-lg font-semibold text-indigo-600">
                                            {vehicle.priceDisplay
                                                ? `R$ ${vehicle.price.toLocaleString("pt-BR")}`
                                                : "Sob consulta"}
                                        </p>
                                    </div>

                                    {/* Informações principais */}
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                        <p className="flex items-center gap-1">
                                            <ClipboardList className="w-4 h-4" />
                                            {vehicle.licensePlateDisplay ? vehicle.licensePlate : "Placa oculta"}
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <Calendar1 className="w-4 h-4" />
                                            {vehicle.modelYear}/{vehicle.manufacturingYear}
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <Fuel className="w-4 h-4" />
                                            {vehicle.fuel}
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <Gauge className="w-4 h-4" />
                                            {vehicle.mileage.toLocaleString("pt-BR")} km
                                        </p>
                                    </div>

                                    {/* Tags visuais */}
                                    <div className="flex flex-wrap gap-2">
                                        {vehicle.armored ? (
                                            <Badge className="bg-yellow-400 text-black">Blindado</Badge>
                                        ) : null}
                                        {vehicle.allowsTrade ? (
                                            <Badge className="bg-blue-600 text-white">Aceita troca</Badge>
                                        ) : null}
                                        {vehicle.allowsProposal ? (
                                            <Badge className="bg-purple-600 text-white">Aceita proposta</Badge>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="pt-5">
                                    <Link href={`/vehicles/${vehicle.idVehicle}`}>
                                        <Button
                                            onClick={() => setLoader(true)}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            {loader ? (
                                                <Loader className="animate-spin h-5 w-5" />
                                            ) : (
                                                <span>Editar veículo</span>
                                            )}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
