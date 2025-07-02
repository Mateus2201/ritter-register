import React from 'react'
import SidebarComponent from '@/components/sidebar'
import PrivateRoute from '@/components/use-routes'
import FormOptional from '@/forms/form-optionals'
import FormOptionalCategory from '@/forms/form-optionals-category'

export default function PageOptionals() {
	return <PrivateRoute>
		<SidebarComponent />
		<div className='flex flex-col justify-center items-center w-full h-full p-4'>

			<FormOptionalCategory />
			<FormOptional />
		</div>
	</PrivateRoute>
}
