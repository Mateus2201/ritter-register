"use client";

import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormVehicle from '@/forms/form-vehicle'

export default function NewVehiclesPage() {
    return <PrivateRoute>
        <SidebarComponent />
        <FormVehicle />
    </PrivateRoute>
}
