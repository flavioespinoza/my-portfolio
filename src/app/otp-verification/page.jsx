'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card } from '@flavioespinoza/salsa-ui'

const OTPPaymentVerification = () => {
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [showOtpInput, setShowOtpInput] = useState(false)
	const [isPaymentFormFilled, setIsPaymentFormFilled] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [showSuccessPopup, setShowSuccessPopup] = useState(false)
	const [isOtpVerified, setIsOtpVerified] = useState(false)
	const inputRefs = useRef([])

	// Sample payment form state
	const [paymentForm, setPaymentForm] = useState({
		cardNumber: '',
		cardName: '',
		expiryDate: '',
		cvv: ''
	})

	// Check if payment form is filled
	useEffect(() => {
		const isFilled = Object.values(paymentForm).every((value) => value.trim() !== '')
		setIsPaymentFormFilled(isFilled)
	}, [paymentForm])

	// Check if OTP is complete
	const isOtpComplete = otp.every((digit) => digit !== '')

	const handleGetOtp = () => {
		setShowOtpInput(true)
		// Auto-focus on first input after showing OTP fields
		setTimeout(() => {
			if (inputRefs.current[0]) {
				inputRefs.current[0].focus()
			}
		}, 0)
	}

	const handleGetOtpClick = () => {
		if (!isPaymentFormFilled || showOtpInput) {
			setShowPopup(true)
			setTimeout(() => setShowPopup(false), 3000)
		} else {
			handleGetOtp()
		}
	}

	const handleOtpChange = (index, value) => {
		// Only allow numerical characters
		if (value && !/^\d$/.test(value)) {
			return
		}

		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)

		// Auto-focus to next input after entering a valid digit
		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (index, e) => {
		// Handle Backspace
		if (e.key === 'Backspace') {
			if (otp[index] === '') {
				// If current input is empty, move focus to previous input
				if (index > 0) {
					inputRefs.current[index - 1]?.focus()
				}
			} else {
				// Clear current digit
				const newOtp = [...otp]
				newOtp[index] = ''
				setOtp(newOtp)
			}
		}

		// Handle Arrow Keys
		if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
		if (e.key === 'ArrowRight' && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handlePaste = (e) => {
		e.preventDefault()
		const pastedData = e.clipboardData.getData('text').slice(0, 6)

		// Only allow numerical characters
		if (!/^\d+$/.test(pastedData)) {
			return
		}

		const newOtp = [...otp]
		for (let i = 0; i < pastedData.length && i < 6; i++) {
			newOtp[i] = pastedData[i]
		}
		setOtp(newOtp)

		// Focus on the next empty input or the last input
		const nextEmptyIndex = newOtp.findIndex((digit) => digit === '')
		if (nextEmptyIndex !== -1) {
			inputRefs.current[nextEmptyIndex]?.focus()
		} else {
			inputRefs.current[5]?.focus()
		}
	}

	const handleMakePayment = () => {
		if (isOtpComplete) {
			// Include OTP in payment request payload
			const paymentPayload = {
				...paymentForm,
				otp: otp.join('')
			}
			console.log('Payment Request:', paymentPayload)
			alert(`Payment submitted with OTP: ${otp.join('')}`)
		}
	}

	const handleVerifyOtp = () => {
		setIsOtpVerified(true)
	}

	const handleVerifyOtpClick = () => {
		if (!isOtpComplete) {
			setShowPopup(true)
			setTimeout(() => setShowPopup(false), 3000)
		} else {
			handleVerifyOtp()
		}
	}

	const handlePaymentFormChange = (field, value) => {
		setPaymentForm((prev) => ({
			...prev,
			[field]: value
		}))
	}

	return (
		<Card className="mx-auto max-w-4xl">
			<div className="mx-auto max-w-4xl">
				<div className="rounded-lg bg-white p-8 shadow-lg">
					<h1 className="text-gray-800 mb-8 text-3xl font-bold">Complete Your Booking</h1>

					<div className="grid gap-8 md:grid-cols-2">
						{/* Payment Details Section / Congratulations Card */}
						{!isOtpVerified ? (
							<div>
								<h2 className="text-gray-700 mb-4 text-xl font-semibold">Payment Details</h2>

								<div className="space-y-4">
									<div>
										<label className="text-gray-700 mb-2 block text-sm font-medium">
											Card Number
										</label>
										<input
											type="text"
											placeholder="1234 5678 9012 3456"
											value={paymentForm.cardNumber}
											onChange={(e) => handlePaymentFormChange('cardNumber', e.target.value)}
											className="border-gray-300 w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label className="text-gray-700 mb-2 block text-sm font-medium">
											Cardholder Name
										</label>
										<input
											type="text"
											placeholder="John Doe"
											value={paymentForm.cardName}
											onChange={(e) => handlePaymentFormChange('cardName', e.target.value)}
											className="border-gray-300 w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-gray-700 mb-2 block text-sm font-medium">
												Expiry Date
											</label>
											<input
												type="text"
												placeholder="MM/YY"
												value={paymentForm.expiryDate}
												onChange={(e) => handlePaymentFormChange('expiryDate', e.target.value)}
												className="border-gray-300 w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="text-gray-700 mb-2 block text-sm font-medium">CVV</label>
											<input
												type="text"
												placeholder="123"
												value={paymentForm.cvv}
												onChange={(e) => handlePaymentFormChange('cvv', e.target.value)}
												className="border-gray-300 w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="animate-fadeIn">
								<div className="from-green-50 to-green-100 border-green-400 flex h-full flex-col items-center justify-center rounded-lg border-2 bg-gradient-to-br p-8 text-center">
									<div className="bg-green-500 mb-4 rounded-full p-4">
										<svg
											className="h-16 w-16 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<h2 className="text-green-700 mb-2 text-3xl font-bold">Congratulations!</h2>
									<p className="text-green-600 mb-4 text-lg">
										Your OTP has been verified successfully
									</p>
									<p className="text-gray-700">Logging you on...</p>
								</div>
							</div>
						)}

						{/* Booking Summary Section */}
						<div>
							<h2 className="text-gray-700 mb-4 text-xl font-semibold">Booking Summary</h2>
							<div className="bg-gray-50 space-y-3 rounded-lg p-6">
								<div className="flex justify-between">
									<span className="text-gray-600">Deluxe Family Apartment</span>
									<span className="font-semibold">$250</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">2 Nights</span>
									<span className="font-semibold">$500</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Service Fee</span>
									<span className="font-semibold">$25</span>
								</div>
								<div className="border-gray-300 flex justify-between border-t pt-3 text-lg">
									<span className="font-bold">Total</span>
									<span className="font-bold text-blue-600">$525</span>
								</div>
							</div>
						</div>
					</div>

					{/* OTP Section */}
					<div className="mt-8 border-t pt-6">
						<div className="mx-auto max-w-2xl">
							<h2 className="text-gray-700 mb-4 text-xl font-semibold">Confirm and Pay</h2>

							{/* Get OTP Button */}
							<button
								onClick={handleGetOtpClick}
								className={`mb-6 w-full rounded-lg px-6 py-3 font-semibold transition-colors ${
									isPaymentFormFilled && !showOtpInput
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-blue-200 text-blue-700'
								}`}
							>
								Get OTP
							</button>

							{/* OTP Input Component */}
							{showOtpInput && (
								<div className="animate-fadeIn space-y-6">
									<div>
										<label className="text-gray-700 mb-3 block text-sm font-medium">
											Enter 6-digit OTP
										</label>
										<div className="flex justify-center gap-2">
											{otp.map((digit, index) => (
												<input
													key={index}
													ref={(el) => (inputRefs.current[index] = el)}
													type="text"
													inputMode="numeric"
													maxLength={1}
													value={digit}
													onChange={(e) => handleOtpChange(index, e.target.value)}
													onKeyDown={(e) => handleKeyDown(index, e)}
													onPaste={index === 0 ? handlePaste : undefined}
													data-testid={`otp-input-${index}`}
													className={`h-14 w-12 rounded-lg border-2 text-center text-2xl font-semibold transition-all focus:outline-none ${
														digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
													} focus:border-blue-600 focus:ring-2 focus:ring-blue-200`}
												/>
											))}
										</div>
										<p className="text-gray-500 mt-2 text-center text-xs">
											Paste a 6-digit code or enter manually
										</p>
									</div>

									{/* Verify OTP Button */}
									<button
										onClick={handleVerifyOtpClick}
										className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors ${
											isOtpComplete
												? 'bg-blue-600 text-white hover:bg-blue-700'
												: 'bg-blue-200 text-blue-700'
										}`}
									>
										Verify OTP
									</button>

									{/* Make Payment Button */}
									<button
										onClick={handleMakePayment}
										disabled={!isOtpComplete}
										className={`w-full rounded-lg px-6 py-4 text-lg font-semibold transition-colors ${
											isOtpComplete
												? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
												: 'bg-gray-300 text-gray-500 cursor-not-allowed'
										}`}
									>
										Make Payment
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Error Popup Alert */}
				{showPopup && (
					<div className="animate-slideDown fixed left-1/2 top-4 z-50 -translate-x-1/2 transform">
						<div className="flex items-center gap-3 rounded-lg bg-red-500 px-6 py-4 text-white shadow-2xl">
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span className="font-semibold">All fields must be filled out!</span>
						</div>
					</div>
				)}

				{/* Success Popup */}
				{showSuccessPopup && (
					<div className="animate-slideDown fixed left-1/2 top-4 z-50 -translate-x-1/2 transform">
						<div className="bg-green-500 flex items-center gap-3 rounded-lg px-6 py-4 text-white shadow-2xl">
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="font-semibold">Congratulations! Logging you on...</span>
						</div>
					</div>
				)}
			</div>

			<style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
		</Card>
	)
}

export default OTPPaymentVerification
