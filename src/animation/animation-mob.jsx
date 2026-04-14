import { useEffect, useRef, useState } from 'react'
import './animation-mob.css'

import MainImg from '../assets/main-mob.jpg'
import CryptoHover from '../assets/river-1-mob.avif'
import ForexHover from '../assets/river-2-mob.avif'
import StocksHover from '../assets/river-3-mob.avif'
import SyntheticsHover from '../assets/river-4-mob.avif'
import CanClick from '../assets/can-click.avif'
import WoWPower from '../assets/wow_powers.webp'
import ArrowBack from '../assets/arrow-left.svg?react'
import ClickBanner from '../components/Click-banner/ClickBanner'
import Timer from '../components/Timer/Timer'
import Commitments from '../components/Commitments/Commitments'

import { JOURNEYS } from '../components/JourneyFlow/journeysData'
import JourneyFlowMobile from '../components/JourneyFlow/JourneyFlowMobile'

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
		alt: 'Synthetics',
		type: 'locked',
	},
]

export const AnimationMob = () => {
	const [mode, setMode] = useState(null)
	const [isZoomed, setIsZoomed] = useState(false)
	const [scale, setScale] = useState(1)
	const [journeyProgress, setJourneyProgress] = useState({})
	const [isJourneyVisible, setIsJourneyVisible] = useState(false)
	const [showCommitments, setShowCommitments] = useState(false)
	const [journeyScreen, setJourneyScreen] = useState(null)

	const openJourneyTimeoutRef = useRef(null)
	const containerRef = useRef(null)

	const isOpened = isZoomed || isJourneyVisible

	const resetToInitialState = () => {
		if (openJourneyTimeoutRef.current) {
			clearTimeout(openJourneyTimeoutRef.current)
		}

		setShowCommitments(false)
		setIsJourneyVisible(false)
		setIsZoomed(false)
		setMode(null)
		setJourneyScreen(null)
	}

	const handleClose = () => {
		resetToInitialState()
	}

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

	const handleOpen = () => {
		if (openJourneyTimeoutRef.current) {
			clearTimeout(openJourneyTimeoutRef.current)
		}

		setIsJourneyVisible(false)
		setShowCommitments(false)
		setMode('crypto')

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

	const stateClass =
		`${mode ? `${mode}-mode` : ''} ${journeyScreen === 'points' ? 'zoomed' : ''}`.trim()

	const showBackButton = isJourneyVisible && journeyScreen === 'points'

	return (
		<div className='main-container-mob' ref={containerRef}>
			<div className='scene-stage-mob' style={{ transform: `scale(${scale})` }}>
				<div className={`main-img-wrap-mob ${stateClass}`}>
					<button
						type='button'
						className={`back-button ${showBackButton ? 'visible' : ''}`}
						onClick={handleClose}
						aria-label='Back'>
						<ArrowBack />
					</button>

					<ClickBanner hidden={isOpened} />
					<Commitments hidden={!showCommitments} />
					<Timer targetDate='01.05.2026' hidden={isOpened} />

					{!isOpened && (
						<img
							className='can-click-image-mob'
							src={CanClick}
							alt='Can click'
						/>
					)}

					<img
						className={`wow-power-mob ${journeyScreen === 'points' ? 'hidden' : ''}`}
						src={WoWPower}
						alt='WoWPower'
					/>

					<img
						className={`main-img-mob ${mode ? `${mode}-mode` : ''} ${
							journeyScreen === 'points' ? 'zoomed' : ''
						}`}
						src={MainImg}
						alt='Main'
					/>

					<button
						type='button'
						className={`hit-area-button-mob ${isOpened ? 'disabled' : ''}`}
						onClick={handleOpen}
					/>

					{mode && isJourneyVisible && (
						<div className='journey-window-wrap'>
							<JourneyFlowMobile
								journeyKey={mode}
								journey={JOURNEYS[mode] ?? null}
								items={ITEMS}
								progress={journeyProgress[mode]}
								onJourneyChange={setMode}
								onCommitmentsToggle={setShowCommitments}
								onStateChange={({ screen }) => {
									setJourneyScreen(screen ?? null)
								}}
								onProgressChange={nextProgress =>
									setJourneyProgress(prev => ({
										...prev,
										[mode]: nextProgress,
									}))
								}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
