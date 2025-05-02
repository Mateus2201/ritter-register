import FormRegister from '@/components/form'
import PrivateRoute from '@/components/private-routes'
import React from 'react'

export default function PageHome() {
  return <PrivateRoute>
    <FormRegister /> 
  </PrivateRoute>
}
