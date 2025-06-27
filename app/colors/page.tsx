import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormColor from '@/forms/form-color'

export default function PageColors() {
	return <PrivateRoute>
		<SidebarComponent />
		<div className="bg-accent h-screen w-screen">
			<FormColor />

		</div>
	</PrivateRoute>
}
