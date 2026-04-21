import { useEffect, useMemo, useRef, useState } from 'react'
import { JourneyStepProvider } from './JourneyStepControls'
import './journey-flow.css'
import GateClose from '../../assets/step-closed.avif'
import GateActive from '../../assets/step-active.avif'
import GateCompleted from '../../assets/step-completed.avif'
import WhiteDot from '../../assets/white-dot.svg?react'

const createEmptyProgress = () => ({
	completedPointIds: [],
	viewedStepIndexesByPointId: {},
	arePointsUnlocked: false,
})

// Ensures external progress (from localStorage or parent) always has all required fields
const normalizeProgress = progress => ({
	completedPointIds: progress?.completedPointIds ?? [],
	viewedStepIndexesByPointId: progress?.viewedStepIndexesByPointId ?? {},
	arePointsUnlocked: progress?.arePointsUnlocked ?? false,
})

// Deep-clones progress before mutation so the JSON.stringify diff check below can detect changes
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

// Only the first point is accessible until the user completes the intro and unlocks the overview
const isPointUnlocked = (journey, pointIndex, progress) => {
	if (progress.arePointsUnlocked) return true
	return pointIndex === 0
}

const getPointById = (journey, pointId) => {
	return (
		journey.points.find(point => point.id === pointId) ??
		journey.points[0] ??
		null
	)
}

// Supports three authoring styles for steps: inline render fn, component class/fn, or raw JSX content
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

// Wrapper that forces a full state reset when the journey structure changes (e.g. switching crypto → stocks)
export default function JourneyFlow(props) {
	const { journeyKey, journey } = props

	const firstPointId = journey?.points?.[0]?.id ?? null
	const introStepsLength = journey?.introSteps?.length ?? 0

	const resetKey = `${journeyKey ?? 'journey'}:${firstPointId ?? 'no-point'}:${introStepsLength}`

	return <JourneyFlowContent key={resetKey} {...props} />
}

function JourneyFlowContent({
	journeyKey,
	journey,
	progress,
	onProgressChange,
	onStateChange,
}) {
	const firstPointId = journey?.points?.[0]?.id ?? null
	const introSteps = journey?.introSteps ?? []

	const safeProgress = useMemo(
		() => normalizeProgress(progress ?? createEmptyProgress()),
		[progress],
	)

	const [activePointId, setActivePointId] = useState(firstPointId)
	const [activeStepIndex, setActiveStepIndex] = useState(0)
	const [isOverviewMode, setIsOverviewMode] = useState(false)
	const [activeIntroStepIndex, setActiveIntroStepIndex] = useState(
		introSteps.length ? 0 : null,
	)
	const [nestedPopup, setNestedPopup] = useState(null)

	// Distinguishes the initial popup open (float-in box → delayed content) from step navigation (immediate fade-in).
	// 800ms covers the 0.75s float-in so any step change after that gets the faster navigation animation.
	const isFirstRenderRef = useRef(true)
	useEffect(() => {
		const timer = setTimeout(() => {
			isFirstRenderRef.current = false
		}, 800)
		return () => clearTimeout(timer)
	}, [])

	const selectedPoint = useMemo(() => {
		if (!journey || !activePointId) return null
		return getPointById(journey, activePointId)
	}, [journey, activePointId])

	const selectedPointIndex = useMemo(() => {
		if (!journey || !selectedPoint) return -1
		return journey.points.findIndex(point => point.id === selectedPoint.id)
	}, [journey, selectedPoint])

	const isIntroMode =
		activeIntroStepIndex !== null &&
		!safeProgress.arePointsUnlocked &&
		!isOverviewMode

	const activeIntroStep = isIntroMode
		? (introSteps[activeIntroStepIndex] ?? null)
		: null

	const pointStep =
		!isOverviewMode && !isIntroMode
			? (selectedPoint?.steps?.[activeStepIndex] ?? null)
			: null

	const activePoint = isIntroMode ? null : selectedPoint
	const activePointIndex = isIntroMode ? -1 : selectedPointIndex
	const activeStep = isIntroMode ? activeIntroStep : pointStep
	const currentStepIndex = isIntroMode ? activeIntroStepIndex : activeStepIndex

	const isFirstStep = isIntroMode
		? activeIntroStepIndex === 0
		: !isOverviewMode && activeStepIndex === 0

	const isLastStep = isIntroMode
		? activeIntroStepIndex === introSteps.length - 1
		: !isOverviewMode &&
			activeStepIndex === (selectedPoint?.steps?.length ?? 1) - 1

	const nextPoint =
		!isIntroMode && !isOverviewMode
			? (journey?.points?.[selectedPointIndex + 1] ?? null)
			: null

	useEffect(() => {
		if (!selectedPoint || isOverviewMode || isIntroMode) return

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

		// Avoid calling onProgressChange when nothing actually changed — prevents infinite update loops
		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
			onProgressChange?.(nextProgress)
		}
	}, [
		selectedPoint,
		activeStepIndex,
		isOverviewMode,
		isIntroMode,
		safeProgress,
		onProgressChange,
	])

	useEffect(() => {
		if (isOverviewMode) {
			onStateChange?.({
				journeyKey,
				point: null,
				pointIndex: -1,
				step: null,
				stepIndex: null,
				isPointCompleted: false,
				isOverviewMode: true,
				isIntroMode: false,
			})
			return
		}

		if (isIntroMode) {
			if (!activeIntroStep) return

			onStateChange?.({
				journeyKey,
				point: null,
				pointIndex: -1,
				step: activeIntroStep,
				stepIndex: activeIntroStepIndex,
				isPointCompleted: false,
				isOverviewMode: false,
				isIntroMode: true,
			})
			return
		}

		if (!selectedPoint || !pointStep) return

		onStateChange?.({
			journeyKey,
			point: selectedPoint,
			pointIndex: selectedPointIndex,
			step: pointStep,
			stepIndex: activeStepIndex,
			isPointCompleted: isPointCompleted(safeProgress, selectedPoint.id),
			isOverviewMode: false,
			isIntroMode: false,
		})
	}, [
		journeyKey,
		isOverviewMode,
		isIntroMode,
		activeIntroStep,
		activeIntroStepIndex,
		selectedPoint,
		selectedPointIndex,
		pointStep,
		activeStepIndex,
		safeProgress,
		onStateChange,
	])

	const openPoint = pointId => {
		if (!journey) return

		const pointIndex = journey.points.findIndex(point => point.id === pointId)
		if (pointIndex === -1) return

		const unlocked = isPointUnlocked(journey, pointIndex, safeProgress)
		if (!unlocked) return

		setActiveIntroStepIndex(null)
		setActivePointId(pointId)
		setActiveStepIndex(0)
		setIsOverviewMode(false)
	}

	const goToStep = stepIndex => {
		if (!selectedPoint || isIntroMode) return
		if (stepIndex < 0 || stepIndex > selectedPoint.steps.length - 1) return

		setActiveStepIndex(stepIndex)
		setIsOverviewMode(false)
	}

	const goToPrevStep = () => {
		if (isIntroMode) {
			if (activeIntroStepIndex > 0) {
				setActiveIntroStepIndex(prev => prev - 1)
			}
			return
		}

		if (isOverviewMode || isFirstStep) return
		setActiveStepIndex(prev => prev - 1)
	}

	const goToNextStep = () => {
		if (isIntroMode) {
			if (activeIntroStepIndex < introSteps.length - 1) {
				setActiveIntroStepIndex(prev => prev + 1)
			}
			return
		}

		if (!selectedPoint || isOverviewMode) return

		if (activeStepIndex < selectedPoint.steps.length - 1) {
			setActiveStepIndex(prev => prev + 1)
			return
		}

		if (nextPoint) {
			openPoint(nextPoint.id)
		}
	}

	const unlockPointsOverview = () => {
		const nextProgress = cloneProgress(safeProgress)
		nextProgress.arePointsUnlocked = true

		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
			onProgressChange?.(nextProgress)
		}

		setActiveIntroStepIndex(null)
		setIsOverviewMode(true)
	}

	const openCurrentStepLink = () => {
		if (!activeStep?.link) return
		openLink(activeStep.link, activeStep.linkTarget ?? '_blank')
	}

	const openPopup = (content, title) => {
		setNestedPopup({ content, title: title ?? null })
	}

	const closePopup = () => {
		setNestedPopup(null)
	}

	if (!journey || !journey.points?.length) {
		return null
	}

	const actions = {
		openPoint,
		goToStep,
		goToPrevStep,
		goToNextStep,
		openLink,
		openCurrentStepLink,
		unlockPointsOverview,
		openPopup,
		closePopup,
		setActivePointId,
		setActiveStepIndex,
		setActiveIntroStepIndex,
		setIsOverviewMode,
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
		activeIntroStepIndex,
		selectedPoint,
		selectedPointIndex,
	}

	const shouldShowPoints = safeProgress.arePointsUnlocked

	return (
		<div className={`journey-flow ${journey.id}`}>
			{shouldShowPoints && (
				<div className='journey-points'>
					{journey.points.map((point, pointIndex) => {
						const unlocked = isPointUnlocked(journey, pointIndex, safeProgress)
						const completed = isPointCompleted(safeProgress, point.id)
						const isActive =
							!isOverviewMode && !isIntroMode && point.id === selectedPoint?.id

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
				</div>
			)}

			{!isOverviewMode && activeStep && (
				// Outer box has no key so it mounts once and plays the float-in animation only on initial open.
				// The key lives on the inner content div so only the content remounts on step navigation.
				<div className='journey-step-view'>
					<div
						key={`${activePoint?.id ?? 'intro'}-${currentStepIndex}`}
						className={`journey-step-content ${isFirstRenderRef.current ? 'step-enter-initial' : 'step-enter'}`}>
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

					{nestedPopup && (
						<div
							className='journey-nested-popup-overlay'
							onClick={closePopup}>
							<div
								className='journey-nested-popup'
								onClick={e => e.stopPropagation()}>
								<button
									type='button'
									className='journey-nested-popup-close'
									onClick={closePopup}
									aria-label='Close'>
									×
								</button>
								{nestedPopup.title && (
									<h3 className='journey-nested-popup-title'>
										{nestedPopup.title}
									</h3>
								)}
								<JourneyStepProvider value={{ actions, state }}>
									{nestedPopup.content}
								</JourneyStepProvider>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
