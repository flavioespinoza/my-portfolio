'use client'

import * as React from 'react'
import {
  Select as RadixSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

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
      <SelectTrigger className={cn('w-full h-10 px-3 py-2 border rounded text-sm', className)}>
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
