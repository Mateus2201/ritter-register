import PrivateRoute from '@/components/use-routes'
import SidebarComponent from '@/components/sidebar'
import React from 'react'
import Stock from '@/components/stock'

export default function PageHome() {
	return <PrivateRoute>
		<SidebarComponent />
		<Stock />
	</PrivateRoute>
}
