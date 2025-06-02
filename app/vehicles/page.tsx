import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormOptional from '@/forms/form-optionals'
import FormOptionalCategory from '@/forms/form-optionals-category'
import FormVehicle from '@/forms/form-vehicle'

export default function vehiclesCars() {
    return <PrivateRoute>
        <SidebarComponent />
        <div className="min-h-screen w-screen bg-gradient-to-br flex items-center justify-center from-[#464646] via-[#626464] to-[#6f6f6f] py-16">
            <div className="max-w-7xl mx-auto px-6 w-screen md:w-3/4">
                <FormVehicle />
            </div>
        </div>
    </PrivateRoute>
}
