import { useEffect, useMemo, useState } from 'react'

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
	if (typeof step.render === 'function') {
		return step.render({
			step,
			point,
			pointIndex,
			stepIndex,
			actions,
			state,
		})
	}

	if (step.component) {
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

	return step.content ?? null
}

export default function JourneyFlow({
	journeyKey,
	journey,
	progress,
	onProgressChange,
	onStateChange,
}) {
	const safeProgress = useMemo(
		() => normalizeProgress(progress ?? createEmptyProgress()),
		[progress],
	)

	const [activePointId, setActivePointId] = useState(
		journey?.points?.[0]?.id ?? null,
	)
	const [activeStepIndex, setActiveStepIndex] = useState(0)

	useEffect(() => {
		setActivePointId(journey?.points?.[0]?.id ?? null)
		setActiveStepIndex(0)

		if (!progress) {
			onProgressChange?.(createEmptyProgress())
		}
	}, [journeyKey])

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

	const saveProgress = updater => {
		const draft = cloneProgress(safeProgress)
		const nextProgress = updater(draft)

		const prevJson = JSON.stringify(safeProgress)
		const nextJson = JSON.stringify(nextProgress)

		if (prevJson !== nextJson) {
			onProgressChange?.(nextProgress)
		}
	}

	useEffect(() => {
		if (!activePoint || !activeStep) return

		saveProgress(currentProgress => {
			const viewedIndexes =
				currentProgress.viewedStepIndexesByPointId[activePoint.id] ?? []

			if (!viewedIndexes.includes(activeStepIndex)) {
				currentProgress.viewedStepIndexesByPointId[activePoint.id] = [
					...viewedIndexes,
					activeStepIndex,
				]
			}

			// Наступна точка відкривається, коли користувач дійшов до останнього кроку поточної точки
			if (
				activeStepIndex === activePoint.steps.length - 1 &&
				!currentProgress.completedPointIds.includes(activePoint.id)
			) {
				currentProgress.completedPointIds.push(activePoint.id)
			}

			return currentProgress
		})
	}, [activePointId, activeStepIndex, activePoint, activeStep])

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

	const goToPrevStep = () => {
		if (activeStepIndex === 0) return
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
		window.open(
			activeStep.link,
			activeStep.linkTarget ?? '_blank',
			'noopener,noreferrer',
		)
	}

	if (!journey || !journey.points?.length) {
		return null
	}

	const actions = {
		openPoint,
		goToPrevStep,
		goToNextStep,
		openCurrentStepLink,
		setActiveStepIndex,
		setActivePointId,
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
					{getStepView({
						step: activeStep,
						point: activePoint,
						pointIndex: activePointIndex,
						stepIndex: activeStepIndex,
						actions,
						state,
					})}
				</div>

				<div className='journey-step-actions'>
					<button type='button' onClick={goToPrevStep} disabled={isFirstStep}>
						Крок назад
					</button>

					{activeStep?.link && (
						<button type='button' onClick={openCurrentStepLink}>
							{activeStep.linkLabel ?? 'Перейти за посиланням'}
						</button>
					)}

					<button type='button' onClick={goToNextStep}>
						{isLastStep
							? nextPoint
								? 'Відкрити наступну точку'
								: 'Завершено'
							: 'Наступний крок'}
					</button>
				</div>
			</div>
		</div>
	)
}
