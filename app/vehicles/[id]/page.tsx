"use client";

import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormVehicle from '@/forms/form-vehicle'
import { useParams } from 'next/navigation';
import FormVehicleOptional from '@/forms/form-vehicles-optional';
import UploadImages from '@/components/images-upload';

export default function VehiclesPage() {
    const params = useParams();
    const { id } = params as { id: string };

    return <PrivateRoute>
        <SidebarComponent />
        <div className="min-h-screen w-screen bg-gradient-to-br flex items-center justify-center from-[#464646] via-[#626464] to-[#6f6f6f] py-16">
            <div className="max-w-7xl mx-auto px-6 w-screen md:w-3/4">
                <FormVehicle idVehicle={id} />
                <FormVehicleOptional idVehicle={id}/>
                <UploadImages idVehicle={id}/>
            </div>
        </div>
    </PrivateRoute>
}
