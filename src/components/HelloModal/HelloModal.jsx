import './HelloModal.css'
import { useCallback, useEffect, useState } from 'react'
import Poster from '../../assets/hello-poster.jpg'

const STORAGE_KEY = 'one-time-video-modal-closed'
const VIDEO_SRC =
	' https://customer-53h132zv3w4ijpjn.cloudflarestream.com/a5ced46286d26c9db14dff7566916509/manifest/video.m3u8'

export default function HelloModal() {
	const [isOpen, setIsOpen] = useState(() => {
		return localStorage.getItem(STORAGE_KEY) !== 'true'
	})

	const closeModal = useCallback(() => {
		localStorage.setItem(STORAGE_KEY, 'true')
		setIsOpen(false)
	}, [])

	useEffect(() => {
		if (!isOpen) return

		const handleEscape = event => {
			if (event.key === 'Escape') {
				closeModal()
			}
		}

		window.addEventListener('keydown', handleEscape)

		return () => {
			window.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, closeModal])

	if (!isOpen) return null

	return (
		<div
			role='dialog'
			aria-modal='true'
			className='hello-modal-overlay'
			onClick={closeModal}>
			<div
				className='hello-modal-content'
				onClick={event => event.stopPropagation()}>
				<video
					className='hello-modal-video'
					src={VIDEO_SRC}
					poster={Poster}
					controls
				/>

				<button
					type='button'
					className='journey-modal-main-button'
					onClick={closeModal}>
					Continue
				</button>
			</div>
		</div>
	)
}
