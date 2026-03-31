import { useEffect, useRef, useState } from 'react'
import './animation.css'

import MainImg from '../assets/main.png'
import CryptoHover from '../assets/river-1-hover.avif'
import CryptoActive from '../assets/river-1-click.avif'
import ForexHover from '../assets/river-2-hover.avif'
import ForexActive from '../assets/river-2-click.avif'
import StocksHover from '../assets/river-3-hover.avif'
import StocksActive from '../assets/river-3-click.avif'
import SyntheticsHover from '../assets/river-4-hover.avif'
import ArrowBack from '../assets/arrow-left.svg?react'

import Eclipse from '../components/Eclipse/Eclipse'
import ClickBanner from '../components/Click-banner/ClickBanner'
import Timer from '../components/Timer/Timer'

const BASE_WIDTH = 1440
const BASE_HEIGHT = 820

const ITEMS = [
	{
		key: 'crypto',
		hoverSrc: CryptoHover,
		activeSrc: CryptoActive,
		alt: 'Crypto',
		type: 'normal',
	},
	{
		key: 'forex',
		hoverSrc: ForexHover,
		activeSrc: ForexActive,
		alt: 'Forex',
		type: 'normal',
	},
	{
		key: 'stocks',
		hoverSrc: StocksHover,
		activeSrc: StocksActive,
		alt: 'Stocks',
		type: 'normal',
	},
	{
		key: 'synthetics',
		hoverSrc: SyntheticsHover,
		activeSrc: SyntheticsHover,
		alt: 'Synthetics',
		type: 'locked',
	},
]

export const Animation = () => {
	const [mode, setMode] = useState(null)
	const [isZoomed, setIsZoomed] = useState(false)
	const [scale, setScale] = useState(1)
	const [hoveredKey, setHoveredKey] = useState(null)
	const [pressedKey, setPressedKey] = useState(null)

	const containerRef = useRef(null)

	useEffect(() => {
		const element = containerRef.current
		if (!element) return

		const updateScale = () => {
			const rect = element.getBoundingClientRect()
			const nextScale = Math.min(
				rect.width / BASE_WIDTH,
				rect.height / BASE_HEIGHT,
			)
			setScale(nextScale)
		}

		updateScale()

		const resizeObserver = new ResizeObserver(() => {
			updateScale()
		})

		resizeObserver.observe(element)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	const handleOpen = nextMode => {
		if (nextMode === 'synthetics') return

		setHoveredKey(null)
		setPressedKey(null)
		setMode(nextMode)

		requestAnimationFrame(() => setIsZoomed(true))
	}

	const handleClose = () => {
		setIsZoomed(false)
		setHoveredKey(null)
		setPressedKey(null)
	}

	const handleTransitionEnd = () => {
		if (!isZoomed) {
			setMode(null)
		}
	}

	const handlePointerEnter = key => {
		if (mode) return
		setHoveredKey(key)
	}

	const handlePointerLeave = key => {
		if (hoveredKey === key) setHoveredKey(null)
		if (pressedKey === key) setPressedKey(null)
	}

	const handlePointerDown = key => {
		if (mode) return
		setPressedKey(key)
	}

	const handlePointerUp = key => {
		if (pressedKey === key) setPressedKey(null)
	}

	const stateClass =
		`${mode ? `${mode}-mode` : ''} ${isZoomed ? 'zoomed' : ''}`.trim()

	const getFeatureClasses = item =>
		[
			'feature-img-wrapper',
			item.key,
			mode === item.key && 'active',
			hoveredKey === item.key && 'hovered',
			pressedKey === item.key && 'pressed',
			item.type === 'locked' && 'locked',
		]
			.filter(Boolean)
			.join(' ')

	const getHitAreaClasses = item =>
		['hit-area', item.key, item.type === 'locked' && 'locked']
			.filter(Boolean)
			.join(' ')

	return (
		<div className='main-container' ref={containerRef}>
			<div className='scene-stage' style={{ transform: `scale(${scale})` }}>
				<div className={`main-img-wrap ${stateClass}`}>
					<button
						type='button'
						className={`back-button ${mode ? 'visible' : ''}`}
						onClick={handleClose}
						aria-label='Back'>
						<ArrowBack />
					</button>
					<ClickBanner hidden={mode} />
					<Timer targetDate='01.05.2026' />
					<img
						className={`main-img ${stateClass}`}
						src={MainImg}
						alt='Main'
						onTransitionEnd={handleTransitionEnd}
					/>

					{ITEMS.map(item => (
						<div key={item.key} className={getFeatureClasses(item)}>
							<Eclipse
								className={`eclipse-image ${item.key}`}
								text={item.alt}
								type={item.type}
							/>
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

					<div className={`hit-areas-layer ${mode ? 'disabled' : ''}`}>
						{ITEMS.map(item => (
							<button
								key={item.key}
								type='button'
								className={getHitAreaClasses(item)}
								onPointerEnter={() => handlePointerEnter(item.key)}
								onPointerLeave={() => handlePointerLeave(item.key)}
								onPointerDown={() => handlePointerDown(item.key)}
								onPointerUp={() => handlePointerUp(item.key)}
								onPointerCancel={() => handlePointerLeave(item.key)}
								onClick={() => handleOpen(item.key)}
								aria-label={
									item.type === 'locked' ? `${item.alt} locked` : item.alt
								}
								aria-pressed={mode === item.key}
							/>
						))}
					</div>

					<div className={`cool-text ${mode ? 'active' : ''}`}></div>
				</div>
			</div>
		</div>
	)
}
