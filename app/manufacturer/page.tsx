import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormManufacturer from '@/forms/form-manufacturer'

export default function PageColors() {
    return <PrivateRoute>
        <SidebarComponent />
        <div className="min-h-screen w-full bg-gradient-to-br from-[#464646] via-[#626464] to-[#6f6f6f] py-16 flex items-center justify-center">
            <div className="w-full max-w-screen-xl px-4">
                <FormManufacturer />
            </div>
        </div>
    </PrivateRoute>
}
