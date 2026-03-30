import { useState } from 'react'
import './animation.css'
import MainImg from '../assets/main.png'
import CryptoHover from '../assets/river-1-hover.avif'
import CryptoActive from '../assets/river-1-click.avif'
import ForexHover from '../assets/river-2-hover.avif'
import ForexActive from '../assets/river-2-click.avif'
import StocksHover from '../assets/river-3-hover.avif'
import StocksActive from '../assets/river-3-click.avif'

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
	const handleOpenStocks = () => {
		setMode('stocks')
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
			<div
				className={`main-img-wrap ${mode === 'forex' ? 'forex-mode' : ''} ${mode === 'crypto' ? 'crypto-mode' : ''} ${mode === 'stocks' ? 'stocks-mode' : ''} ${isZoomed ? 'zoomed' : ''}`}>
				<button
					type='button'
					className={`back-button ${mode ? 'visible' : ''}`}
					onClick={handleClose}>
					Back
				</button>

				<img
					className={`main-img ${mode === 'forex' ? 'forex-mode' : ''} ${mode === 'crypto' ? 'crypto-mode' : ''} ${mode === 'stocks' ? 'stocks-mode' : ''} ${isZoomed ? 'zoomed' : ''}`}
					src={MainImg}
					alt='Main'
					onTransitionEnd={handleTransitionEnd}
				/>
				<div
					className={`crypto-img-wrapper ${mode === 'crypto' ? 'active' : ''}`}
					onClick={handleOpenCrypto}>
					<img className='crypto-img-hover' src={CryptoHover} alt='Crypto' />
					<img className='crypto-img-active' src={CryptoActive} alt='Crypto' />
				</div>
				<div
					className={`forex-img-wrapper ${mode === 'forex' ? 'active' : ''}`}
					onClick={handleOpenForex}>
					<img className='forex-img-hover' src={ForexHover} alt='Forex' />
					<img className='forex-img-active' src={ForexActive} alt='Forex' />
				</div>
				<div
					className={`stocks-img-wrapper ${mode === 'stocks' ? 'active' : ''}`}
					onClick={handleOpenStocks}>
					<img className='stocks-img-hover' src={StocksHover} alt='Stocks' />
					<img className='stocks-img-active' src={StocksActive} alt='Stocks' />
				</div>

				<div className={`cool-text ${mode ? 'active' : ''}`}></div>
			</div>
		</div>
	)
}
