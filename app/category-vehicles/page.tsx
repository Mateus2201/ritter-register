import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormVehicleCategory from '@/forms/form-vehicles-category'

export default function PageColors() {
    return <PrivateRoute>
        <SidebarComponent />
        <FormVehicleCategory />
    </PrivateRoute>
}
