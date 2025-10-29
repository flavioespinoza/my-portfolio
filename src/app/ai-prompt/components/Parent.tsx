'use client'

import React, { useRef } from 'react'
import Modal from './Modal'

export default function Parent() {
	const modalRef = useRef<{ openModal: () => void }>(null)

	const handleClick = () => {
		modalRef.current?.openModal()
	}

	return (
		<div>
			<h1>Broken Modal Test</h1>
			<button onClick={handleClick}>Open Modal</button>
			<Modal ref={modalRef} title="Async Modal" show={false} />
		</div>
	)
}
