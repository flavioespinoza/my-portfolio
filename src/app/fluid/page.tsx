'use client'

import * as React from 'react'
import ButtonFluid from '@/components/ui/button-fluid'

export default function FluidPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-6">
			<div className="max-w-2xl space-y-8 text-center">
				<h2 className="text-xl font-semibold">These are just experiments using fluid CSS</h2>
        <p>Resize the browser window and see the fluid transitions of the elements below.</p>
        <h1 className="~md/lg:~text-base/4xl">Quick increase</h1>
				<ButtonFluid onClick={() => alert('Clicked!')}>Fluid Button</ButtonFluid>
			</div>
		</div>
	)
}
