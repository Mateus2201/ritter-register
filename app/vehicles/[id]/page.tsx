"use client";

import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormVehicle from '@/forms/form-vehicle'
import { useParams } from 'next/navigation';

export default function VehiclesPage() {
    const params = useParams();
    const { id } = params as { id: string };

    return <PrivateRoute>
        <SidebarComponent />
        <FormVehicle idVehicle={id} />
    </PrivateRoute>
}
