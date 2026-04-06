import { useEffect, useMemo, useState } from 'react'
import { JourneyStepProvider } from './JourneyStepControls'

const createEmptyProgress = () => ({
	completedPointIds: [],
	viewedStepIndexesByPointId: {},
})

const normalizeProgress = progress => ({
	completedPointIds: progress?.completedPointIds ?? [],
	viewedStepIndexesByPointId: progress?.viewedStepIndexesByPointId ?? {},
})

const cloneProgress = progress => ({
	completedPointIds: [...progress.completedPointIds],
	viewedStepIndexesByPointId: Object.fromEntries(
		Object.entries(progress.viewedStepIndexesByPointId).map(
			([pointId, indexes]) => [pointId, [...indexes]],
		),
	),
})

const isPointCompleted = (progress, pointId) =>
	progress.completedPointIds.includes(pointId)

const isPointUnlocked = (journey, pointIndex, progress) => {
	if (pointIndex === 0) return true

	const prevPoint = journey.points[pointIndex - 1]
	return isPointCompleted(progress, prevPoint.id)
}

const getPointById = (journey, pointId) => {
	return (
		journey.points.find(point => point.id === pointId) ??
		journey.points[0] ??
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

export default function JourneyFlow({
	journeyKey,
	journey,
	progress,
	onProgressChange,
	onStateChange,
}) {
	const firstPointId = journey?.points?.[0]?.id ?? null

	const safeProgress = useMemo(
		() => normalizeProgress(progress ?? createEmptyProgress()),
		[progress],
	)

	const [activePointId, setActivePointId] = useState(firstPointId)
	const [activeStepIndex, setActiveStepIndex] = useState(0)

	const activePoint = useMemo(() => {
		if (!journey) return null
		return getPointById(journey, activePointId)
	}, [journey, activePointId])

	const activePointIndex = useMemo(() => {
		if (!journey || !activePoint) return -1
		return journey.points.findIndex(point => point.id === activePoint.id)
	}, [journey, activePoint])

	const activeStep = activePoint?.steps?.[activeStepIndex] ?? null
	const isFirstStep = activeStepIndex === 0
	const isLastStep = activeStepIndex === (activePoint?.steps?.length ?? 1) - 1
	const nextPoint = journey?.points?.[activePointIndex + 1] ?? null

	useEffect(() => {
		if (!activePoint || !activeStep) return

		const nextProgress = cloneProgress(safeProgress)

		const viewedIndexes =
			nextProgress.viewedStepIndexesByPointId[activePoint.id] ?? []

		if (!viewedIndexes.includes(activeStepIndex)) {
			nextProgress.viewedStepIndexesByPointId[activePoint.id] = [
				...viewedIndexes,
				activeStepIndex,
			]
		}

		if (
			activeStepIndex === activePoint.steps.length - 1 &&
			!nextProgress.completedPointIds.includes(activePoint.id)
		) {
			nextProgress.completedPointIds.push(activePoint.id)
		}

		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
			onProgressChange?.(nextProgress)
		}
	}, [activePoint, activeStep, activeStepIndex, safeProgress, onProgressChange])

	useEffect(() => {
		if (!activePoint || !activeStep) return

		onStateChange?.({
			journeyKey,
			point: activePoint,
			pointIndex: activePointIndex,
			step: activeStep,
			stepIndex: activeStepIndex,
			isPointCompleted: isPointCompleted(safeProgress, activePoint.id),
		})
	}, [
		journeyKey,
		activePoint,
		activePointIndex,
		activeStep,
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

		setActivePointId(pointId)
		setActiveStepIndex(0)
	}

	const goToStep = stepIndex => {
		if (!activePoint) return
		if (stepIndex < 0 || stepIndex > activePoint.steps.length - 1) return

		setActiveStepIndex(stepIndex)
	}

	const goToPrevStep = () => {
		if (isFirstStep) return
		setActiveStepIndex(prev => prev - 1)
	}

	const goToNextStep = () => {
		if (!activePoint) return

		if (activeStepIndex < activePoint.steps.length - 1) {
			setActiveStepIndex(prev => prev + 1)
			return
		}

		if (nextPoint) {
			openPoint(nextPoint.id)
		}
	}

	const openCurrentStepLink = () => {
		if (!activeStep?.link) return
		openLink(activeStep.link, activeStep.linkTarget ?? '_blank')
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
		setActivePointId,
		setActiveStepIndex,
	}

	const state = {
		journey,
		progress: safeProgress,
		activePoint,
		activePointIndex,
		activeStep,
		activeStepIndex,
		isFirstStep,
		isLastStep,
		nextPoint,
	}

	return (
		<div className='journey-flow'>
			<div className='journey-points'>
				{journey.points.map((point, pointIndex) => {
					const unlocked = isPointUnlocked(journey, pointIndex, safeProgress)
					const completed = isPointCompleted(safeProgress, point.id)
					const isActive = point.id === activePoint?.id

					return (
						<button
							key={point.id}
							type='button'
							className={[
								'journey-point-button',
								isActive ? 'active' : '',
								unlocked ? 'unlocked' : 'locked',
								completed ? 'completed' : '',
							]
								.filter(Boolean)
								.join(' ')}
							onClick={() => openPoint(point.id)}
							disabled={!unlocked}>
							{point.title}
						</button>
					)
				})}
			</div>

			<div className='journey-step-view'>
				<div className='journey-step-content'>
					<JourneyStepProvider value={{ actions, state }}>
						{getStepView({
							step: activeStep,
							point: activePoint,
							pointIndex: activePointIndex,
							stepIndex: activeStepIndex,
							actions,
							state,
						})}
					</JourneyStepProvider>
				</div>
			</div>
		</div>
	)
}
