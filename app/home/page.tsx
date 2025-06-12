import VehicleForm from '@/components/optionals'
import PrivateRoute from '@/components/use-routes'
import SidebarComponent from '@/components/sidebar'
import React from 'react'
import CardCar from '@/components/card-car'
import Stock from '@/components/stock'

export default function PageHome() {
	return <PrivateRoute>
		<SidebarComponent />
		<div className="min-h-screen w-screen bg-gradient-to-br from-[#464646] via-[#626464] to-[#6f6f6f] py-16">
			<Stock />
		</div>
	</PrivateRoute>
}
