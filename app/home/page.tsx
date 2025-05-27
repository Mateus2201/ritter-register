import FormVehicle from '@/forms/form-vehicle'
import VehicleForm from '@/components/optionals'
import PrivateRoute from '@/components/use-routes'
import SidebarComponent from '@/components/sidebar'
import React from 'react'

export default function PageHome() {
  return <PrivateRoute>
    <SidebarComponent />
    <FormVehicle />
    {/* <VehicleForm/> */}
  </PrivateRoute>
}
