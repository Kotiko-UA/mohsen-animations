import { useEffect, useMemo, useState } from 'react'
import { JourneyStepProvider } from './JourneyStepControls'
import './journey-flow-mobile.css'
import Timer from '../Timer/Timer'
import Arrow from '../../assets/arrow-purple.svg?react'
import ArrowWhite from '../../assets/arrow-purple.svg?react'
import Dot from '../../assets/white-dot.svg?react'
import Eclipse from '../Eclipse/Eclipse'
import GateClose from '../../assets/step-closed.avif'
import GateActive from '../../assets/step-active.avif'
import GateCompleted from '../../assets/step-completed.avif'
import WhiteDot from '../../assets/white-dot.svg?react'

const createEmptyProgress = () => ({
	completedPointIds: [],
	viewedStepIndexesByPointId: {},
	arePointsUnlocked: false,
})

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
	arePointsUnlocked: progress?.arePointsUnlocked ?? false,
})

const isPointCompleted = (progress, pointId) =>
	progress.completedPointIds.includes(pointId)

const isPointUnlocked = (journey, pointIndex, progress) => {
	if (progress.arePointsUnlocked) return true
	return pointIndex === 0
}
const getPointById = (journey, pointId) => {
	return (
		journey?.points?.find(point => point.id === pointId) ??
		journey?.points?.[0] ??
		null
	)
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

const openLink = (link, target = '_blank') => {
	if (!link) return
	window.open(link, target, 'noopener,noreferrer')
}

const MOBILE_SCREENS = {
	SELECTOR: 'selector',
	INTRO: 'intro',
	TIME: 'time',
	POINTS: 'points',
	STEP: 'step',
}

const getInitialSlideIndex = (items, journeyKey) => {
	const index = items.findIndex(item => item.key === journeyKey)
	return index >= 0 ? index : 0
}

export default function JourneyFlowMobile({
	journeyKey,
	journey,
	items = [],
	progress,
	onProgressChange,
	onStateChange,
	onJourneyChange,
	onCommitmentsToggle,
}) {
	const safeProgress = useMemo(
		() => normalizeProgress(progress ?? createEmptyProgress()),
		[progress],
	)

	const introSteps = journey?.introSteps ?? []
	const firstPointId = journey?.points?.[0]?.id ?? null

	const [screen, setScreen] = useState(MOBILE_SCREENS.SELECTOR)
	const [slideIndex, setSlideIndex] = useState(
		getInitialSlideIndex(items, journeyKey),
	)
	const [activePointId, setActivePointId] = useState(firstPointId)
	const [activeStepIndex, setActiveStepIndex] = useState(0)

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

	const activeIntroStep =
		screen === MOBILE_SCREENS.INTRO
			? (introSteps[0] ?? null)
			: screen === MOBILE_SCREENS.TIME
				? (introSteps[1] ?? null)
				: null

	const pointStep =
		screen === MOBILE_SCREENS.STEP
			? (selectedPoint?.steps?.[activeStepIndex] ?? null)
			: null

	const activeStep = activeIntroStep ?? pointStep
	const activePoint = screen === MOBILE_SCREENS.STEP ? selectedPoint : null
	const activePointIndex =
		screen === MOBILE_SCREENS.STEP ? selectedPointIndex : -1
	const currentStepIndex =
		screen === MOBILE_SCREENS.STEP
			? activeStepIndex
			: screen === MOBILE_SCREENS.INTRO
				? 0
				: screen === MOBILE_SCREENS.TIME
					? 1
					: null

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

		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
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

	const setJourneyByIndex = nextIndex => {
		const normalizedIndex =
			nextIndex < 0
				? items.length - 1
				: nextIndex >= items.length
					? 0
					: nextIndex

		const nextItem = items[normalizedIndex]
		if (!nextItem) return

		setSlideIndex(normalizedIndex)
		onJourneyChange?.(nextItem.key)
	}

	const goToPrevSlide = () => setJourneyByIndex(slideIndex - 1)
	const goToNextSlide = () => setJourneyByIndex(slideIndex + 1)

	const openSelector = () => {
		setScreen(MOBILE_SCREENS.SELECTOR)
		setActivePointId(firstPointId)
		setActiveStepIndex(0)
	}

	const openIntro = () => {
		if (isLockedJourney || !introSteps[0]) return
		setScreen(MOBILE_SCREENS.INTRO)
	}

	const openTime = () => {
		if (isLockedJourney || !introSteps[1]) {
			unlockPointsOverview()
			return
		}

		setScreen(MOBILE_SCREENS.TIME)
	}

	const openPoint = pointId => {
		const point = getPointById(journey, pointId)
		if (!point) return

		setActivePointId(point.id)
		setActiveStepIndex(0)
		setScreen(MOBILE_SCREENS.STEP)
	}

	const goToStep = stepIndex => {
		if (!selectedPoint) return
		if (stepIndex < 0 || stepIndex > selectedPoint.steps.length - 1) return

		setActiveStepIndex(stepIndex)
		setScreen(MOBILE_SCREENS.STEP)
	}

	const unlockPointsOverview = () => {
		const nextProgress = cloneProgress(safeProgress)
		nextProgress.arePointsUnlocked = true

		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
			onProgressChange?.(nextProgress)
		}

		setScreen(MOBILE_SCREENS.POINTS)
	}

	const goToPrevStep = () => {
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
	}

	const goToNextStep = () => {
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
	}

	const openCurrentStepLink = () => {
		if (!activeStep?.link) return
		openLink(activeStep.link, activeStep.linkTarget ?? '_blank')
	}

	const actions = {
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
	}

	const state = {
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
	}

	if (!currentSlide) {
		return null
	}

	return (
		<div className={`journey-flow-mobile ${currentSlide.key} screen-${screen}`}>
			{currentSlide.hoverSrc && (
				<img
					className={`journey-mobile-river-image ${currentSlide.key}`}
					src={currentSlide.hoverSrc}
					alt={`${currentSlide.alt} river`}
				/>
			)}

			{screen === MOBILE_SCREENS.SELECTOR && (
				<div className='journey-mobile-selector'>
					<Timer targetDate='01.05.2026' />

					<div className='journey-mobile-selector-card'>
						<button
							type='button'
							className='journey-mobile-cta'
							onClick={openIntro}
							disabled={isLockedJourney}>
							<div className='journey-mobile-cta-title'>
								<Dot className='journey-mobile-cta-dot' />
								<span>{currentSlide.alt ?? journey?.title ?? 'Journey'}</span>
							</div>

							<div className='journey-mobile-cta-meta'>
								{isLockedJourney ? (
									<span className='journey-mobile-coming-soon'>
										Coming soon!
									</span>
								) : (
									<span
										style={{
											display: 'flex',
											gap: '8px',
											alignItems: 'center',
										}}>
										See info
										<ArrowWhite style={{ width: '24px', height: '24px' }} />
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
								<Arrow style={{ transform: 'rotate(180deg)' }} />
							</button>
						</div>
					</div>
				</div>
			)}

			{journey && screen === MOBILE_SCREENS.POINTS && (
				<div className='journey-mobile-points-view'>
					{journey.points.map((point, pointIndex) => {
						const unlocked = isPointUnlocked(journey, pointIndex, safeProgress)
						const completed = isPointCompleted(safeProgress, point.id)
						const isActive = point.id === selectedPoint?.id

						const pointImage = isActive
							? GateActive
							: completed
								? GateCompleted
								: GateClose

						const pointAlt = isActive
							? 'active gate'
							: completed
								? 'completed gate'
								: 'closed gate'

						const pointLabel = isActive ? point.title : completed ? 'Done' : ''

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
									<img src={pointImage} alt={pointAlt} />
								</div>

								{pointLabel && (
									<div
										className={`journey-point-label ${
											!isActive && completed ? 'done' : ''
										}`}>
										{isActive && <WhiteDot />}
										{pointLabel}
									</div>
								)}
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
					<div className='journey-mobile-step-view'>
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
