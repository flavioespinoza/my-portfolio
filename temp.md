## Directory Structure

```
broken-modal-demo/
├── app/
│   ├── page.tsx
│   ├── components/
│   │   ├── Modal.tsx          ← broken version
│   │   ├── Parent.tsx
│   │   └── Panel.tsx
│   └── globals.css
├── package.json
├── tsconfig.json
├── next.config.mjs
└── yarn.lock
```

---

## app/components/Panel.tsx

```tsx
'use client'

import React from 'react'

interface PanelProps {
	isExpanded: boolean
	children: React.ReactNode
}

export default function Panel({ isExpanded, children }: PanelProps) {
	return <div style={{ display: isExpanded ? 'block' : 'none' }}>{children}</div>
}
```

---

## app/components/Modal.tsx (Broken Version)

```tsx
'use client'

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Panel from './Panel'

interface ModalHandle {
	openModal: () => void
}

interface ModalProps {
	title: string
	show: boolean
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ title, show }, ref) {
	const [visible, setVisible] = useState(show)
	const [asyncState, setAsyncState] = useState(false)
	const internalButtonRef = React.createRef<HTMLButtonElement>()

	// ❌ Common forwardRef mistake:
	// Improperly recreating refs and defining handles inside async updates
	useImperativeHandle(ref, () => ({
		openModal: async () => {
			await new Promise((r) => setTimeout(r, 200))
			// During async updates, the ref may be null
			if (internalButtonRef.current) {
				setAsyncState(true)
				setVisible(true)
				internalButtonRef.current.click()
			} else {
				console.warn('Ref is null during openModal call!')
			}
		}
	}))

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
```

---

## app/components/Parent.tsx

```tsx
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
```

---

## app/page.tsx

```tsx
'use client'

import React from 'react'
import Parent from './components/Parent'

export default function Page() {
	return (
		<main style={{ padding: '2rem' }}>
			<Parent />
		</main>
	)
}
```
