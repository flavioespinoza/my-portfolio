// Create a Button component with strict typing
// Requirements:
// - variant: 'primary' | 'secondary' | 'danger'
// - size: 'sm' | 'md' | 'lg'
// - Optional icon prop
// - Children can be string or ReactNode
// - All standard button props should be supported

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary' | 'danger'
	size: 'sm' | 'md' | 'lg'
	icon?: React.ReactNode
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
	const { variant, size, icon, children, className, ...rest } = props

	// Base styles for all buttons
	const baseStyles =
		'rounded font-semibold transition-colors inline-flex items-center justify-center'

	// Variant-specific styles
	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
		danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
	}

	// Size-specific styles
	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	}

	// Combine all styles
	const combinedClassName =
		`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`.trim()

	return (
		<button className={combinedClassName} {...rest}>
			{icon && <span className="mr-2">{icon}</span>}
			{children}
		</button>
	)
}

export default Button
