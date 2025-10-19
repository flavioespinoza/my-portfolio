'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
	Select as RadixSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@radix-ui/react-select'

interface SelectProps {
	value: string
	onValueChange: (value: string) => void
	options: { label: string; value: string }[]
	placeholder?: string
	className?: string
}

export function Select({ value, onValueChange, options, placeholder, className }: SelectProps) {
	return (
		<RadixSelect value={value} onValueChange={onValueChange}>
			<SelectTrigger className={cn('h-10 w-full rounded border px-3 py-2 text-sm', className)}>
				<SelectValue placeholder={placeholder || 'Select'} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{placeholder}</SelectLabel>
					{options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</RadixSelect>
	)
}
