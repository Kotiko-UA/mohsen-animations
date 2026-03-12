import { useState } from 'react'
import './animation.css'
import MainImg from '../assets/main.png'
import Forex from '../assets/forex.png'
import Crypto from '../assets/crypto.png'

export const Animation = () => {
	const [mode, setMode] = useState(null) // 'forex' | 'crypto' | null
	const [isZoomed, setIsZoomed] = useState(false)

	const handleOpenForex = () => {
		setMode('forex')
		requestAnimationFrame(() => setIsZoomed(true))
	}

	const handleOpenCrypto = () => {
		setMode('crypto')
		requestAnimationFrame(() => setIsZoomed(true))
	}

	const handleClose = () => {
		setIsZoomed(false)
	}

	const handleTransitionEnd = () => {
		if (!isZoomed) {
			setMode(null)
		}
	}

	return (
		<div className='main-container'>
			<div className='main-img-wrap'>
				<button
					type='button'
					className={`back-button ${mode ? 'visible' : ''}`}
					onClick={handleClose}>
					Back
				</button>

				<img
					className={`main-img ${mode === 'forex' ? 'forex-mode' : ''} ${mode === 'crypto' ? 'crypto-mode' : ''} ${isZoomed ? 'zoomed' : ''}`}
					src={MainImg}
					alt='Main'
					onTransitionEnd={handleTransitionEnd}
				/>

				<img
					className={`forex-img ${mode === 'forex' ? 'active' : ''}`}
					src={Forex}
					alt='Forex'
					onClick={handleOpenForex}
				/>

				<img
					className={`crypto-img ${mode === 'crypto' ? 'active' : ''}`}
					src={Crypto}
					alt='Crypto'
					onClick={handleOpenCrypto}
				/>

				<div className={`cool-text ${mode ? 'active' : ''}`}></div>
			</div>
		</div>
	)
}
