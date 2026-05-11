import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './animation-mob.css'

import MainImg from '../assets/main-mob.jpg'
import MainImgTablet from '../assets/main-tablet.jpg'
import CryptoHoverMobile from '../assets/river-1-mob.avif'
import ForexHoverMobile from '../assets/river-2-mob.avif'
import StocksHoverMobile from '../assets/river-3-mob.avif'
import SyntheticsHoverMobile from '../assets/river-4-mob.avif'
import CryptoHoverTablet from '../assets/river-1-tablet.avif'
import ForexHoverTablet from '../assets/river-2-tablet.avif'
import StocksHoverTablet from '../assets/river-3-tablet.avif'
import SyntheticsHoverTablet from '../assets/river-4-tablet.avif'
import WoWPower from '../assets/wow_powers.webp'
import ArrowBack from '../assets/arrow-purple.svg?react'

import ClickBanner from '../components/Click-banner/ClickBanner'
import Timer from '../components/Timer/Timer'
import Commitments from '../components/Commitments/Commitments'
import JourneyFlowMobile from '../components/JourneyFlow/JourneyFlowMobile'
import { JOURNEYS } from '../components/JourneyFlow/journeysData'

// Mobile and tablet design canvas dimensions — CSS is authored at these resolutions
const BASE_WIDTH = 375
const BASE_HEIGHT = 812
const BASE_WIDTH_TABLET = 1024
const BASE_HEIGHT_TABLET = 576
const TARGET_DATE = '01.05.2026'
// Delay before showing journey UI — allows the CSS zoom transition to begin before content appears
const JOURNEY_OPEN_DELAY = 400

const ITEMS = [
	{
		key: 'finance',
		alt: 'Financial Literacy',
		type: 'locked',
	},
	{
		key: 'crypto',
		hoverSrc: {
			mobile: CryptoHoverMobile,
			tablet: CryptoHoverTablet,
		},
		alt: 'Crypto',
		type: 'normal',
	},
	{
		key: 'forex',
		hoverSrc: {
			mobile: ForexHoverMobile,
			tablet: ForexHoverTablet,
		},
		alt: 'Forex',
		type: 'normal',
	},
	{
		key: 'stocks',
		hoverSrc: {
			mobile: StocksHoverMobile,
			tablet: StocksHoverTablet,
		},
		alt: 'Stocks',
		type: 'normal',
	},
	{
		key: 'synthetics',
		hoverSrc: {
			mobile: SyntheticsHoverMobile,
			tablet: SyntheticsHoverTablet,
		},
		alt: 'Synthetics',
		type: 'locked',
	},
]

const isMobileViewport = width => width < 768

const getScale = ({ width, height }) => {
	const isMobile = isMobileViewport(width)

	const baseWidth = isMobile ? BASE_WIDTH : BASE_WIDTH_TABLET
	const baseHeight = isMobile ? BASE_HEIGHT : BASE_HEIGHT_TABLET

	return Math.min(width / baseWidth, height / baseHeight)
}

export const AnimationMob = () => {
	const [mode, setMode] = useState(null)
	const [isZoomed, setIsZoomed] = useState(false)
	const [scale, setScale] = useState(1)
	const [journeyProgress, setJourneyProgress] = useState({})
	const [isJourneyVisible, setIsJourneyVisible] = useState(false)
	const [showCommitments, setShowCommitments] = useState(false)
	const [journeyScreen, setJourneyScreen] = useState(null)
	// Incrementing this key forces JourneyFlowMobile to fully remount and reset its internal state
	const [journeyResetKey, setJourneyResetKey] = useState(0)
	const [isMobile, setIsMobile] = useState(true)

	const containerRef = useRef(null)
	const openJourneyTimeoutRef = useRef(null)

	const isOpened = isZoomed || isJourneyVisible
	const shouldZoom = journeyScreen === 'points' || journeyScreen === 'step'

	const showBackButton = isJourneyVisible && journeyScreen === 'points'

	const isWowPowerHidden =
		journeyScreen === 'points' || journeyScreen === 'step'

	const isWowPowerBehind =
		isJourneyVisible && !!journeyScreen && journeyScreen !== 'selector'

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

	const mainImgSrc = isMobile ? MainImg : MainImgTablet

	useEffect(() => {
		const element = containerRef.current
		if (!element) return

		const updateScale = () => {
			const rect = element.getBoundingClientRect()

			setIsMobile(isMobileViewport(rect.width))
			setScale(getScale({ width: rect.width, height: rect.height }))
		}

		updateScale()

		const resizeObserver = new ResizeObserver(updateScale)
		resizeObserver.observe(element)

		return () => resizeObserver.disconnect()
	}, [])

	// Return the cleanup fn directly — clears any pending open-delay timeout on unmount
	useEffect(() => clearOpenJourneyTimeout, [clearOpenJourneyTimeout])

	const handleOpen = useCallback(() => {
		clearOpenJourneyTimeout()

		setIsJourneyVisible(false)
		setShowCommitments(false)
		setMode('finance')

		openJourneyWithDelay()
	}, [clearOpenJourneyTimeout, openJourneyWithDelay])

	const handleBackToCurrentJourney = useCallback(() => {
		clearOpenJourneyTimeout()

		setShowCommitments(false)
		setJourneyScreen('selector')
		setIsJourneyVisible(false)
		// Bump reset key to force JourneyFlowMobile remount — just resetting screen state isn't enough
		// because the mobile journey keeps deep internal state (intro index, selections) that must be cleared
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
					<a
						href='https://league.sagemaster.com/'
						rel='noopener noreferrer nofollow'
						target='_blank'
						className={`wow-power-link-mob ${isWowPowerHidden ? 'wow-power-mob-hidden' : ''} ${isWowPowerBehind ? 'wow-power-mob-behind' : ''}`}>
						<img className='wow-power-mob' src={WoWPower} alt='WoWPower' />
					</a>

					<img className={mainImageClassName} src={mainImgSrc} alt='Main' />

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
								isMobile={isMobile}
								progress={journeyProgress[mode]}
								onJourneyChange={setMode}
								onCommitmentsToggle={setShowCommitments}
								onStateChange={handleJourneyStateChange}
								onProgressChange={handleProgressChange}
								handleBackToCurrentJourney={handleBackToCurrentJourney}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
