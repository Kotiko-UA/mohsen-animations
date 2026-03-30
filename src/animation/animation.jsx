import { useState } from 'react'
import './animation.css'

import MainImg from '../assets/main.png'
import CryptoHover from '../assets/river-1-hover.avif'
import CryptoActive from '../assets/river-1-click.avif'
import ForexHover from '../assets/river-2-hover.avif'
import ForexActive from '../assets/river-2-click.avif'
import StocksHover from '../assets/river-3-hover.avif'
import StocksActive from '../assets/river-3-click.avif'

import Eclipse from '../components/Eclipse/Eclipse'

const ITEMS = [
	{
		key: 'crypto',
		hoverSrc: CryptoHover,
		activeSrc: CryptoActive,
		alt: 'Crypto',
	},
	{
		key: 'forex',
		hoverSrc: ForexHover,
		activeSrc: ForexActive,
		alt: 'Forex',
	},
	{
		key: 'stocks',
		hoverSrc: StocksHover,
		activeSrc: StocksActive,
		alt: 'Stocks',
	},
]

export const Animation = () => {
	const [mode, setMode] = useState(null)
	const [isZoomed, setIsZoomed] = useState(false)

	const handleOpen = nextMode => {
		setMode(nextMode)
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

	const stateClass =
		`${mode ? `${mode}-mode` : ''} ${isZoomed ? 'zoomed' : ''}`.trim()

	return (
		<div className='main-container'>
			<div className={`main-img-wrap ${stateClass}`}>
				<button
					type='button'
					className={`back-button ${mode ? 'visible' : ''}`}
					onClick={handleClose}>
					Back
				</button>

				<img
					className={`main-img ${stateClass}`}
					src={MainImg}
					alt='Main'
					onTransitionEnd={handleTransitionEnd}
				/>

				{ITEMS.map(item => (
					<div
						key={item.key}
						className={`feature-img-wrapper ${item.key} ${mode === item.key ? 'active' : ''}`}
						onClick={() => handleOpen(item.key)}>
						<Eclipse className={`eclipse-image ${item.key}`} text={item.alt} />
						<img
							className='feature-img-hover'
							src={item.hoverSrc}
							alt={item.alt}
						/>
						<img
							className='feature-img-active'
							src={item.activeSrc}
							alt={item.alt}
						/>
					</div>
				))}

				<div className={`cool-text ${mode ? 'active' : ''}`}></div>
			</div>
		</div>
	)
}
