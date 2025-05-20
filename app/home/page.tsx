import FormRegister from '@/components/form'
import VehicleForm from '@/components/optionals'
import PrivateRoute from '@/components/private-routes'
import SidebarComponent from '@/components/sidebar'
import React from 'react'

export default function PageHome() {
  return <PrivateRoute>
    {/* <SidebarComponent /> */}
    <FormRegister />
    {/* <VehicleForm/> */}
  </PrivateRoute>
}
