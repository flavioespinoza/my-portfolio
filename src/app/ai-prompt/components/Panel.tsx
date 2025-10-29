'use client'

import React from 'react'

interface PanelProps {
	isExpanded: boolean
	children: React.ReactNode
}

export default function Panel({ isExpanded, children }: PanelProps) {
	return <div style={{ display: isExpanded ? 'block' : 'none' }}>{children}</div>
}
