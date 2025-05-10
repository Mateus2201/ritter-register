import FormRegister from '@/components/form'
import PrivateRoute from '@/components/private-routes'
import SidebarComponent from '@/components/sidebar'
import React from 'react'

export default function PageHome() {
  return <PrivateRoute>
    <SidebarComponent />
    <FormRegister />
  </PrivateRoute>
}
