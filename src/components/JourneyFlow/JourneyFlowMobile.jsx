import { useCallback, useEffect, useMemo, useState } from 'react'
import { JourneyStepProvider } from './JourneyStepControls'
import './journey-flow-mobile.css'

import Timer from '../Timer/Timer'
import Eclipse from '../Eclipse/Eclipse'
import Arrow from '../../assets/arrow-purple.svg?react'
import ArrowWhite from '../../assets/arrow-left.svg?react'
import Dot from '../../assets/white-dot.svg?react'
import Lock from '../../assets/lock.svg?react'
import WhiteDot from '../../assets/white-dot.svg?react'
import CheckIcon from '../../assets/check-green.svg?react'
import GateClose from '../../assets/step-closed.avif'
import GateActive from '../../assets/step-active.avif'
import GateCompleted from '../../assets/step-completed.avif'

const TARGET_DATE = '01.05.2026'

const MOBILE_SCREENS = {
	SELECTOR: 'selector',
	INTRO: 'intro',
	TIME: 'time',
	POINTS: 'points',
	STEP: 'step',
}

const EMPTY_PROGRESS = {
	completedPointIds: [],
	viewedStepIndexesByPointId: {},
	arePointsUnlocked: false,
}

const SEE_INFO_STYLE = {
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
}

const ARROW_ICON_STYLE = {
	width: '24px',
	height: '24px',
}

const NEXT_ARROW_STYLE = {
	transform: 'rotate(180deg)',
}

const normalizeProgress = progress => ({
	completedPointIds: progress?.completedPointIds ?? [],
	viewedStepIndexesByPointId: progress?.viewedStepIndexesByPointId ?? {},
	arePointsUnlocked: progress?.arePointsUnlocked ?? false,
})

const cloneProgress = progress => ({
	completedPointIds: [...progress.completedPointIds],
	viewedStepIndexesByPointId: Object.fromEntries(
		Object.entries(progress.viewedStepIndexesByPointId).map(
			([pointId, indexes]) => [pointId, [...indexes]],
		),
	),
	arePointsUnlocked: progress.arePointsUnlocked,
})

const isSameProgress = (firstProgress, secondProgress) =>
	JSON.stringify(firstProgress) === JSON.stringify(secondProgress)

const isPointCompleted = (progress, pointId) =>
	progress.completedPointIds.includes(pointId)

const isPointUnlocked = (_journey, pointIndex, progress) =>
	progress.arePointsUnlocked || pointIndex === 0

const getPointById = (journey, pointId) =>
	journey?.points?.find(point => point.id === pointId) ??
	journey?.points?.[0] ??
	null

const getInitialSlideIndex = (items, journeyKey) => {
	const index = items.findIndex(item => item.key === journeyKey)

	return index >= 0 ? index : 0
}

const getNormalizedIndex = (index, length) => {
	if (index < 0) return length - 1
	if (index >= length) return 0

	return index
}

const openLink = (link, target = '_blank') => {
	if (!link) return

	window.open(link, target, 'noopener,noreferrer')
}

const getStepView = ({
	step,
	point,
	pointIndex,
	stepIndex,
	actions,
	state,
}) => {
	if (typeof step?.render === 'function') {
		return step.render({
			step,
			point,
			pointIndex,
			stepIndex,
			actions,
			state,
		})
	}

	if (step?.component) {
		const StepComponent = step.component

		return (
			<StepComponent
				step={step}
				point={point}
				pointIndex={pointIndex}
				stepIndex={stepIndex}
				actions={actions}
				state={state}
			/>
		)
	}

	return step?.content ?? null
}

const getPointImageData = ({ isActive, completed }) => {
	if (isActive) {
		return {
			image: GateActive,
			alt: 'active gate',
			label: null,
		}
	}

	if (completed) {
		return {
			image: GateCompleted,
			alt: 'completed gate',
			label: 'Done',
		}
	}

	return {
		image: GateClose,
		alt: 'closed gate',
		label: '',
	}
}

const EMPTY_INTRO_STEPS = []

export default function JourneyFlowMobile({
	journeyKey,
	journey,
	items = [],
	isMobile,
	progress,
	onProgressChange,
	onStateChange,
	onJourneyChange,
	onCommitmentsToggle,
}) {
	const safeProgress = useMemo(
		() => normalizeProgress(progress ?? EMPTY_PROGRESS),
		[progress],
	)

	const introSteps = useMemo(
		() => journey?.introSteps ?? EMPTY_INTRO_STEPS,
		[journey?.introSteps],
	)
	const firstPointId = journey?.points?.[0]?.id ?? null

	const [screen, setScreen] = useState(MOBILE_SCREENS.SELECTOR)
	const [slideIndex, setSlideIndex] = useState(() =>
		getInitialSlideIndex(items, journeyKey),
	)
	const [activePointId, setActivePointId] = useState(firstPointId)
	const [activeStepIndex, setActiveStepIndex] = useState(0)

	const isZoomScreen =
		screen === MOBILE_SCREENS.POINTS || screen === MOBILE_SCREENS.STEP

	const delayedContentClass = isZoomScreen
		? 'journey-mobile-delayed-content'
		: ''

	useEffect(() => {
		setSlideIndex(getInitialSlideIndex(items, journeyKey))
	}, [items, journeyKey])

	useEffect(() => {
		setActivePointId(firstPointId)
		setActiveStepIndex(0)
		setScreen(MOBILE_SCREENS.SELECTOR)
	}, [firstPointId, journeyKey])

	useEffect(() => {
		onCommitmentsToggle?.(screen === MOBILE_SCREENS.TIME)

		return () => {
			onCommitmentsToggle?.(false)
		}
	}, [screen, onCommitmentsToggle])

	const currentSlide = items[slideIndex] ?? null
	const isLockedJourney = currentSlide?.type === 'locked'

	const selectedPoint = useMemo(() => {
		if (!journey || !activePointId) return null

		return getPointById(journey, activePointId)
	}, [journey, activePointId])

	const selectedPointIndex = useMemo(() => {
		if (!journey || !selectedPoint) return -1

		return journey.points.findIndex(point => point.id === selectedPoint.id)
	}, [journey, selectedPoint])

	const activeIntroStep = useMemo(() => {
		if (screen === MOBILE_SCREENS.INTRO) return introSteps[0] ?? null
		if (screen === MOBILE_SCREENS.TIME) return introSteps[1] ?? null

		return null
	}, [introSteps, screen])

	const pointStep = useMemo(() => {
		if (screen !== MOBILE_SCREENS.STEP) return null

		return selectedPoint?.steps?.[activeStepIndex] ?? null
	}, [activeStepIndex, screen, selectedPoint])

	const activeStep = activeIntroStep ?? pointStep
	const activePoint = screen === MOBILE_SCREENS.STEP ? selectedPoint : null
	const activePointIndex =
		screen === MOBILE_SCREENS.STEP ? selectedPointIndex : -1

	const currentStepIndex = useMemo(() => {
		if (screen === MOBILE_SCREENS.STEP) return activeStepIndex
		if (screen === MOBILE_SCREENS.INTRO) return 0
		if (screen === MOBILE_SCREENS.TIME) return 1

		return null
	}, [activeStepIndex, screen])

	const isIntroMode =
		screen === MOBILE_SCREENS.INTRO || screen === MOBILE_SCREENS.TIME
	const isOverviewMode = screen === MOBILE_SCREENS.POINTS

	const nextPoint =
		screen === MOBILE_SCREENS.STEP
			? (journey?.points?.[selectedPointIndex + 1] ?? null)
			: null

	const isFirstStep =
		screen === MOBILE_SCREENS.INTRO ||
		(screen === MOBILE_SCREENS.STEP && activeStepIndex === 0)

	const isLastStep =
		screen === MOBILE_SCREENS.TIME ||
		(screen === MOBILE_SCREENS.STEP &&
			activeStepIndex === (selectedPoint?.steps?.length ?? 1) - 1)

	useEffect(() => {
		if (!selectedPoint || screen !== MOBILE_SCREENS.STEP) return

		const nextProgress = cloneProgress(safeProgress)
		const viewedIndexes =
			nextProgress.viewedStepIndexesByPointId[selectedPoint.id] ?? []

		if (!viewedIndexes.includes(activeStepIndex)) {
			nextProgress.viewedStepIndexesByPointId[selectedPoint.id] = [
				...viewedIndexes,
				activeStepIndex,
			]
		}

		if (
			nextProgress.arePointsUnlocked &&
			!nextProgress.completedPointIds.includes(selectedPoint.id)
		) {
			nextProgress.completedPointIds.push(selectedPoint.id)
		}

		if (!isSameProgress(safeProgress, nextProgress)) {
			onProgressChange?.(nextProgress)
		}
	}, [selectedPoint, activeStepIndex, safeProgress, screen, onProgressChange])

	useEffect(() => {
		if (!journey) return

		onStateChange?.({
			journeyKey,
			point: activePoint,
			pointIndex: activePointIndex,
			step: activeStep,
			stepIndex: currentStepIndex,
			isPointCompleted: activePoint
				? isPointCompleted(safeProgress, activePoint.id)
				: false,
			isOverviewMode,
			isIntroMode,
			activeIntroStep,
			screen,
		})
	}, [
		journey,
		journeyKey,
		activePoint,
		activePointIndex,
		activeStep,
		currentStepIndex,
		safeProgress,
		isOverviewMode,
		isIntroMode,
		activeIntroStep,
		screen,
		onStateChange,
	])

	const setJourneyByIndex = useCallback(
		nextIndex => {
			const normalizedIndex = getNormalizedIndex(nextIndex, items.length)
			const nextItem = items[normalizedIndex]

			if (!nextItem) return

			setSlideIndex(normalizedIndex)
			onJourneyChange?.(nextItem.key)
		},
		[items, onJourneyChange],
	)

	const goToPrevSlide = useCallback(() => {
		setJourneyByIndex(slideIndex - 1)
	}, [setJourneyByIndex, slideIndex])

	const goToNextSlide = useCallback(() => {
		setJourneyByIndex(slideIndex + 1)
	}, [setJourneyByIndex, slideIndex])

	const openSelector = useCallback(() => {
		setScreen(MOBILE_SCREENS.SELECTOR)
		setActivePointId(firstPointId)
		setActiveStepIndex(0)
	}, [firstPointId])

	const unlockPointsOverview = useCallback(() => {
		const nextProgress = cloneProgress(safeProgress)
		nextProgress.arePointsUnlocked = true

		if (!isSameProgress(safeProgress, nextProgress)) {
			onProgressChange?.(nextProgress)
		}

		setScreen(MOBILE_SCREENS.POINTS)
	}, [safeProgress, onProgressChange])

	const openIntro = useCallback(() => {
		if (isLockedJourney || !introSteps[0]) return

		setScreen(MOBILE_SCREENS.INTRO)
	}, [introSteps, isLockedJourney])

	const openTime = useCallback(() => {
		if (isLockedJourney || !introSteps[1]) {
			unlockPointsOverview()
			return
		}

		setScreen(MOBILE_SCREENS.TIME)
	}, [introSteps, isLockedJourney, unlockPointsOverview])

	const openPoint = useCallback(
		pointId => {
			const point = getPointById(journey, pointId)
			if (!point) return

			setActivePointId(point.id)
			setActiveStepIndex(0)
			setScreen(MOBILE_SCREENS.STEP)
		},
		[journey],
	)

	const goToStep = useCallback(
		stepIndex => {
			if (!selectedPoint) return
			if (stepIndex < 0 || stepIndex > selectedPoint.steps.length - 1) return

			setActiveStepIndex(stepIndex)
			setScreen(MOBILE_SCREENS.STEP)
		},
		[selectedPoint],
	)

	const goToPrevStep = useCallback(() => {
		if (screen === MOBILE_SCREENS.TIME) {
			setScreen(MOBILE_SCREENS.INTRO)
			return
		}

		if (screen === MOBILE_SCREENS.INTRO) {
			openSelector()
			return
		}

		if (screen !== MOBILE_SCREENS.STEP) return

		if (activeStepIndex > 0) {
			setActiveStepIndex(prev => prev - 1)
			return
		}

		setScreen(MOBILE_SCREENS.POINTS)
	}, [activeStepIndex, openSelector, screen])

	const goToNextStep = useCallback(() => {
		if (screen === MOBILE_SCREENS.INTRO) {
			openTime()
			return
		}

		if (screen === MOBILE_SCREENS.TIME) {
			unlockPointsOverview()
			return
		}

		if (screen !== MOBILE_SCREENS.STEP || !selectedPoint) return

		if (activeStepIndex < selectedPoint.steps.length - 1) {
			setActiveStepIndex(prev => prev + 1)
			return
		}

		if (nextPoint) {
			openPoint(nextPoint.id)
			return
		}

		setScreen(MOBILE_SCREENS.POINTS)
	}, [
		activeStepIndex,
		nextPoint,
		openPoint,
		openTime,
		screen,
		selectedPoint,
		unlockPointsOverview,
	])

	const openCurrentStepLink = useCallback(() => {
		if (!activeStep?.link) return

		openLink(activeStep.link, activeStep.linkTarget ?? '_blank')
	}, [activeStep])

	const actions = useMemo(
		() => ({
			openSelector,
			openIntro,
			openTime,
			openPoint,
			goToStep,
			goToPrevStep,
			goToNextStep,
			unlockPointsOverview,
			openLink,
			openCurrentStepLink,
			setActivePointId,
			setActiveStepIndex,
			setScreen,
		}),
		[
			goToNextStep,
			goToPrevStep,
			goToStep,
			openCurrentStepLink,
			openIntro,
			openPoint,
			openSelector,
			openTime,
			unlockPointsOverview,
		],
	)

	const state = useMemo(
		() => ({
			journey,
			progress: safeProgress,
			activePoint,
			activePointIndex,
			activeStep,
			activeStepIndex: currentStepIndex,
			isFirstStep,
			isLastStep,
			nextPoint,
			isOverviewMode,
			isIntroMode,
			activeIntroStep,
			activeIntroStepIndex:
				screen === MOBILE_SCREENS.INTRO
					? 0
					: screen === MOBILE_SCREENS.TIME
						? 1
						: null,
			selectedPoint,
			selectedPointIndex,
			screen,
			currentSlide,
		}),
		[
			activeIntroStep,
			activePoint,
			activePointIndex,
			activeStep,
			currentSlide,
			currentStepIndex,
			isFirstStep,
			isIntroMode,
			isLastStep,
			isOverviewMode,
			journey,
			nextPoint,
			safeProgress,
			screen,
			selectedPoint,
			selectedPointIndex,
		],
	)

	if (!currentSlide) {
		return null
	}

	return (
		<div className={`journey-flow-mobile ${currentSlide.key} screen-${screen}`}>
			{currentSlide.hoverSrc && (
				<img
					key={currentSlide.key}
					className={`journey-mobile-river-image ${currentSlide.key} ${delayedContentClass}`}
					src={
						isMobile
							? currentSlide?.hoverSrc?.mobile
							: currentSlide?.hoverSrc?.tablet
					}
					alt={`${currentSlide.alt} river`}
				/>
			)}

			{screen === MOBILE_SCREENS.SELECTOR && (
				<div className='journey-mobile-selector'>
					<Timer targetDate={TARGET_DATE} />

					<div className='journey-mobile-selector-card'>
						<button
							type='button'
							className='journey-mobile-cta'
							onClick={openIntro}
							disabled={isLockedJourney}>
							<div className='journey-mobile-cta-title'>
								{isLockedJourney ? (
									<Lock className='journey-mobile-cta-lock' />
								) : (
									<Dot className='journey-mobile-cta-dot' />
								)}
								<span>{currentSlide.alt ?? journey?.title ?? 'Journey'}</span>
							</div>

							<div className='journey-mobile-cta-meta '>
								{isLockedJourney ? (
									<span className='journey-mobile-coming-soon'>
										Coming soon!
									</span>
								) : (
									<span style={SEE_INFO_STYLE}>
										See info
										<ArrowWhite style={ARROW_ICON_STYLE} />
									</span>
								)}
							</div>
						</button>

						<div className='journey-mobile-selector-footer'>
							<button
								type='button'
								className='journey-mobile-nav-button'
								onClick={goToPrevSlide}
								aria-label='Previous journey'>
								<Arrow />
							</button>

							<div className='journey-mobile-dots'>
								{items.map((item, index) => (
									<span
										key={item.key}
										className={[
											'journey-mobile-dot',
											index === slideIndex ? 'active' : '',
											item.type === 'locked' ? 'locked' : '',
										]
											.filter(Boolean)
											.join(' ')}
									/>
								))}
							</div>

							<button
								type='button'
								className='journey-mobile-nav-button'
								onClick={goToNextSlide}
								aria-label='Next journey'>
								<Arrow style={NEXT_ARROW_STYLE} />
							</button>
						</div>
					</div>
				</div>
			)}

			{journey && screen === MOBILE_SCREENS.POINTS && (
				<div className={`journey-mobile-points-view ${delayedContentClass}`}>
					{journey.points.map((point, pointIndex) => {
						const unlocked = isPointUnlocked(journey, pointIndex, safeProgress)
						const completed = isPointCompleted(safeProgress, point.id)
						const isActive = point.id === selectedPoint?.id
						const pointImageData = getPointImageData({ isActive, completed })

						return (
							<button
								key={point.id}
								type='button'
								className={[
									'journey-point-button',
									isActive ? 'active' : '',
									unlocked ? 'unlocked' : 'locked',
									completed ? 'completed' : '',
									point.id,
								]
									.filter(Boolean)
									.join(' ')}
								onClick={() => openPoint(point.id)}
								disabled={!unlocked}>
								<div className='journey-point-image-wrap'>
									<img src={pointImageData.image} alt={pointImageData.alt} />
								</div>
								<div
									className={`journey-point-label ${isActive ? 'active' : ''} ${
										!isActive && completed ? 'done' : ''
									}`}>
									{isActive && <WhiteDot />}
									{!isActive && completed && (
										<CheckIcon className='journey-point-check-icon' />
									)}
									{point.title}
								</div>
							</button>
						)
					})}

					<button
						type='button'
						className='journey-mobile-entry-button'
						onClick={() => openPoint(firstPointId)}
						disabled={!firstPointId || isLockedJourney}>
						<Eclipse
							className={`eclipse-image ${currentSlide.key} journey-active`}
							text={currentSlide.alt ?? journey?.title ?? 'Journey'}
							type={currentSlide.type}
						/>
					</button>
				</div>
			)}

			{journey &&
				activeStep &&
				(screen === MOBILE_SCREENS.INTRO ||
					screen === MOBILE_SCREENS.TIME ||
					screen === MOBILE_SCREENS.STEP) && (
					<div
						key={`${activePoint?.id ?? 'intro'}-${currentStepIndex}`}
						className={`journey-mobile-step-view ${delayedContentClass}  step-enter`}>
						<JourneyStepProvider value={{ actions, state }}>
							{getStepView({
								step: activeStep,
								point: activePoint,
								pointIndex: activePointIndex,
								stepIndex: currentStepIndex,
								actions,
								state,
							})}
						</JourneyStepProvider>
					</div>
				)}
		</div>
	)
}
