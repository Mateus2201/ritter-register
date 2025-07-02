import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormManufacturer from '@/forms/form-manufacturer'

export default function PageColors() {
    return <PrivateRoute>
        <SidebarComponent />
        <FormManufacturer />
    </PrivateRoute>
}
