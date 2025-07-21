import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormConfig from '@/forms/form-config'
import React from 'react'

export default function ConfigPage() {
    return <PrivateRoute>
        <SidebarComponent />
        <FormConfig />
    </PrivateRoute>
}
