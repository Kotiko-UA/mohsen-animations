import { useEffect, useRef, useState } from 'react'
import './animation-mob.css'

import MainImg from '../assets/main-mob.jpg'
import CryptoHover from '../assets/river-1-mob.avif'
import ForexHover from '../assets/river-2-mob.avif'
import StocksHover from '../assets/river-3-mob.avif'
import SyntheticsHover from '../assets/river-4-mob.avif'
import CanClick from '../assets/can-click.avif'
import WoWPower from '../assets/wow_powers.webp'

import Eclipse from '../components/Eclipse/Eclipse'
import ClickBanner from '../components/Click-banner/ClickBanner'
import Timer from '../components/Timer/Timer'
import Commitments from '../components/Commitments/Commitments'

import JourneyFlow from '../components/JourneyFlow/JourneyFlow'
import { JOURNEYS } from '../components/JourneyFlow/journeysData'

const BASE_WIDTH = 375
const BASE_HEIGHT = 812

const ITEMS = [
	{
		key: 'crypto',
		hoverSrc: CryptoHover,
		alt: 'Crypto',
		type: 'normal',
	},
	{
		key: 'forex',
		hoverSrc: ForexHover,
		alt: 'Forex',
		type: 'normal',
	},
	{
		key: 'stocks',
		hoverSrc: StocksHover,
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

export const AnimationMob = () => {
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

		requestAnimationFrame(() => {
			setIsZoomed(true)

			openJourneyTimeoutRef.current = setTimeout(() => {
				setIsJourneyVisible(true)
			}, 400)
		})
	}

	useEffect(() => {
		return () => {
			if (openJourneyTimeoutRef.current) {
				clearTimeout(openJourneyTimeoutRef.current)
			}
		}
	}, [])

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
		<div className='main-container-mob' ref={containerRef}>
			<div className='scene-stage-mob' style={{ transform: `scale(${scale})` }}>
				<div className={`main-img-wrap-mob ${stateClass}`}>
					<ClickBanner hidden={mode} />
					{/* <Commitments hidden={mode} /> */}
					<Timer targetDate='01.05.2026' hidden={mode} />

					{!mode && (
						<img className='can-click-image' src={CanClick} alt='Can click' />
					)}
					{!mode && (
						<img className='wow-power-mob' src={WoWPower} alt='WoWPower' />
					)}

					<img
						className={`main-img-mob ${stateClass}`}
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
