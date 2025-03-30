import React from 'react'

interface ButtonFluidProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
}

const ButtonFluid: React.FC<ButtonFluidProps> = ({ children, className = '', ...props }) => {
	return React.createElement(
		'button',
		{
			className: `rounded-full bg-gray transition ~text-sm/xl ~px-4/8 ~py-2/4 ${className}`,
			...props
		},
		children
	)
}

export default ButtonFluid
