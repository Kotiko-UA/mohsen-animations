import { useEffect, useRef, useState } from 'react'
import './animation.css'

import MainImg from '../assets/main.jpg'
import CryptoHover from '../assets/river-1-hover.avif'
import CryptoActive from '../assets/river-1-click.avif'
import ForexHover from '../assets/river-2-hover.avif'
import ForexActive from '../assets/river-2-click.avif'
import StocksHover from '../assets/river-3-hover.avif'
import StocksActive from '../assets/river-3-click.avif'
import SyntheticsHover from '../assets/river-4-hover.avif'
import ArrowBack from '../assets/arrow-purple.svg?react'
import WoWPower from '../assets/wow_powers.webp'

import Eclipse from '../components/Eclipse/Eclipse'
import ClickBanner from '../components/Click-banner/ClickBanner'
import Timer from '../components/Timer/Timer'
import Commitments from '../components/Commitments/Commitments'

import JourneyFlow from '../components/JourneyFlow/JourneyFlow'
import { JOURNEYS } from '../components/JourneyFlow/journeysData'

// Design canvas dimensions — all positions and sizes in CSS are authored at this resolution
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
	const [journeyProgress, setJourneyProgress] = useState({})
	const [activeJourneyState, setActiveJourneyState] = useState(null)
	const [isJourneyVisible, setIsJourneyVisible] = useState(false)
	const openJourneyTimeoutRef = useRef(null)

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

		if (openJourneyTimeoutRef.current) {
			clearTimeout(openJourneyTimeoutRef.current)
		}

		setHoveredKey(null)
		setPressedKey(null)
		setActiveJourneyState(null)
		setIsJourneyVisible(false)
		setMode(nextMode)

		// rAF ensures the mode class is painted before zoom starts, preventing a flash
		requestAnimationFrame(() => {
			setIsZoomed(true)

			// 400ms matches the CSS zoom transition duration (transform 0.6s — journey appears mid-animation for overlap)
			openJourneyTimeoutRef.current = setTimeout(() => {
				setIsJourneyVisible(true)
			}, 400)
		})
	}

	const handleClose = () => {
		if (openJourneyTimeoutRef.current) {
			clearTimeout(openJourneyTimeoutRef.current)
		}

		setIsJourneyVisible(false)
		setIsZoomed(false)
		setHoveredKey(null)
		setPressedKey(null)
		setActiveJourneyState(null)
	}
	useEffect(() => {
		return () => {
			if (openJourneyTimeoutRef.current) {
				clearTimeout(openJourneyTimeoutRef.current)
			}
		}
	}, [])

	// Clear mode only after the zoom-out transition finishes so CSS classes stay active during animation
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

	// Drives the 'journey-active' highlight on the eclipse overlay matching the current step's zone
	const activeSceneNode = activeJourneyState?.step?.meta?.sceneNode || null

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
					<Commitments hidden={mode} />
					<Timer targetDate='01.05.2026' hidden={mode} />

					{!mode && (
						<a
							href='https://league.sagemaster.com/'
							target='_blank'
							rel='noopener noreferrer nofollow'
							className='wow-power-link'>
							<img className='wow-power' src={WoWPower} alt='WoWPower' />
						</a>
					)}

					<img
						className={`main-img ${stateClass}`}
						src={MainImg}
						alt='Main'
						onTransitionEnd={handleTransitionEnd}
					/>

					{ITEMS.map(item => (
						<div key={item.key} className={getFeatureClasses(item)}>
							<Eclipse
								className={`eclipse-image ${item.key} ${
									activeSceneNode === item.key ? 'journey-active' : ''
								}`}
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

					{mode && isJourneyVisible && (
						<div className='journey-window-wrap'>
							<div className='journey-overlay' />
							<JourneyFlow
								key={mode}
								journeyKey={mode}
								journey={JOURNEYS[mode]}
								progress={journeyProgress[mode]}
								onProgressChange={nextProgress =>
									setJourneyProgress(prev => ({
										...prev,
										[mode]: nextProgress,
									}))
								}
								onStateChange={setActiveJourneyState}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
