import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import JourneyFlowMobile from '../components/JourneyFlow/JourneyFlowMobile'
import { JOURNEYS } from '../components/JourneyFlow/journeysData'

const BASE_WIDTH = 375
const BASE_HEIGHT = 812
const TARGET_DATE = '01.05.2026'
const JOURNEY_OPEN_DELAY = 400
const ZOOM_TRANSITION_MS = 600

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

const getScale = element => {
	const rect = element.getBoundingClientRect()

	return Math.min(rect.width / BASE_WIDTH, rect.height / BASE_HEIGHT)
}

export const AnimationMob = () => {
	const [mode, setMode] = useState(null)
	const [isZoomed, setIsZoomed] = useState(false)
	const [scale, setScale] = useState(1)
	const [journeyProgress, setJourneyProgress] = useState({})
	const [isJourneyVisible, setIsJourneyVisible] = useState(false)
	const [showCommitments, setShowCommitments] = useState(false)
	const [journeyScreen, setJourneyScreen] = useState(null)
	const [journeyResetKey, setJourneyResetKey] = useState(0)

	const containerRef = useRef(null)
	const openJourneyTimeoutRef = useRef(null)

	const isOpened = isZoomed || isJourneyVisible
	const shouldZoom = journeyScreen === 'points' || journeyScreen === 'step'

	const showBackButton = isJourneyVisible && journeyScreen === 'points'

	const isWowPowerHidden =
		journeyScreen === 'points' || journeyScreen === 'step'

	const mainImageClassName = useMemo(
		() =>
			['main-img-mob', mode ? `${mode}-mode` : '', shouldZoom ? 'zoomed' : '']
				.filter(Boolean)
				.join(' '),
		[mode, shouldZoom],
	)

	const stateClassName = useMemo(
		() =>
			[mode ? `${mode}-mode` : '', shouldZoom ? 'zoomed' : '']
				.filter(Boolean)
				.join(' '),
		[mode, shouldZoom],
	)

	const clearOpenJourneyTimeout = useCallback(() => {
		if (!openJourneyTimeoutRef.current) return

		clearTimeout(openJourneyTimeoutRef.current)
		openJourneyTimeoutRef.current = null
	}, [])

	const openJourneyWithDelay = useCallback(() => {
		requestAnimationFrame(() => {
			setIsZoomed(true)

			openJourneyTimeoutRef.current = setTimeout(() => {
				setIsJourneyVisible(true)
				openJourneyTimeoutRef.current = null
			}, JOURNEY_OPEN_DELAY)
		})
	}, [])

	useEffect(() => {
		const element = containerRef.current
		if (!element) return undefined

		const updateScale = () => {
			setScale(getScale(element))
		}

		updateScale()

		const resizeObserver = new ResizeObserver(updateScale)
		resizeObserver.observe(element)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect(() => clearOpenJourneyTimeout, [clearOpenJourneyTimeout])

	const handleOpen = useCallback(() => {
		clearOpenJourneyTimeout()

		setIsJourneyVisible(false)
		setShowCommitments(false)
		setMode('crypto')

		openJourneyWithDelay()
	}, [clearOpenJourneyTimeout, openJourneyWithDelay])

	const handleBackToCurrentJourney = useCallback(() => {
		clearOpenJourneyTimeout()

		setShowCommitments(false)
		setJourneyScreen('selector')
		setIsJourneyVisible(false)
		setJourneyResetKey(prev => prev + 1)

		openJourneyWithDelay()
	}, [clearOpenJourneyTimeout, openJourneyWithDelay])

	const handleJourneyStateChange = useCallback(({ screen }) => {
		setJourneyScreen(screen ?? null)
	}, [])

	const handleProgressChange = useCallback(
		nextProgress => {
			if (!mode) return

			setJourneyProgress(prev => ({
				...prev,
				[mode]: nextProgress,
			}))
		},
		[mode],
	)

	return (
		<div className='main-container-mob' ref={containerRef}>
			<div className='scene-stage-mob' style={{ transform: `scale(${scale})` }}>
				<div className={`main-img-wrap-mob ${stateClassName}`}>
					<button
						type='button'
						className={`back-button ${showBackButton ? 'visible' : ''}`}
						onClick={handleBackToCurrentJourney}
						aria-label='Back'>
						<ArrowBack />
					</button>

					<ClickBanner hidden={isOpened} />
					<Commitments hidden={!showCommitments} />
					<Timer targetDate={TARGET_DATE} hidden={isOpened} />

					{!isOpened && (
						<img
							className='can-click-image-mob'
							src={CanClick}
							alt='Can click'
						/>
					)}

					<img
						className={`wow-power-mob ${
							isWowPowerHidden ? 'wow-power-mob-hidden' : ''
						}`}
						src={WoWPower}
						alt='WoWPower'
					/>

					<img className={mainImageClassName} src={MainImg} alt='Main' />

					<button
						type='button'
						className={`hit-area-button-mob ${isOpened ? 'disabled' : ''}`}
						onClick={handleOpen}
					/>

					{mode && isJourneyVisible && (
						<div className='journey-window-wrap'>
							<JourneyFlowMobile
								key={`${mode}-${journeyResetKey}`}
								journeyKey={mode}
								journey={JOURNEYS[mode] ?? null}
								items={ITEMS}
								progress={journeyProgress[mode]}
								onJourneyChange={setMode}
								onCommitmentsToggle={setShowCommitments}
								onStateChange={handleJourneyStateChange}
								onProgressChange={handleProgressChange}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
