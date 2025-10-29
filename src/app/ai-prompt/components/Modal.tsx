'use client'

import React, { forwardRef, useState } from 'react'
import Panel from './Panel'

interface ModalProps {
	title: string
	show: boolean
}
const Modal = forwardRef(function Modal({ title, show }: ModalProps, ref: any) {
	const [visible, setVisible] = useState(show)
	const [asyncState, setAsyncState] = useState(false)

	const internalButtonRef = React.createRef<HTMLButtonElement>()

	const openModal = async () => {
		await new Promise((r) => setTimeout(r, 200))

		if (internalButtonRef.current) {
			setAsyncState(true)
			setVisible(true)
			internalButtonRef.current.click()
		}
	}

	React.useEffect(() => {
		if (show) {
			openModal()
		}
	}, [show])

	return (
		<Panel isExpanded={visible}>
			<div className="modal">
				<h2>{title}</h2>
				<button ref={internalButtonRef}>Confirm</button>
				{asyncState && <p>Async mode active</p>}
			</div>
		</Panel>
	)
})

export default Modal
