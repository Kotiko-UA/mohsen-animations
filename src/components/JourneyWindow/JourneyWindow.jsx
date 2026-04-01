import { useEffect, useMemo, useState } from 'react'
import styles from './JourneyWindow.module.css'
import ArrowBack from '../../assets/arrow-left.svg?react'

export default function JourneyWindow({
	pathKey,
	flows,
	className = '',
	onStepChange,
	onFlowStart,
	onFlowExit,
	onLinkOpen,
}) {
	const flow = useMemo(() => {
		return pathKey ? (flows?.[pathKey] ?? null) : null
	}, [flows, pathKey])

	const [history, setHistory] = useState([])
	const [currentStepId, setCurrentStepId] = useState(null)

	useEffect(() => {
		if (!flow) {
			setHistory([])
			setCurrentStepId(null)
			return
		}

		setHistory([])
		setCurrentStepId(flow.initialStepId)

		onFlowStart?.({
			pathKey,
			flow,
			initialStepId: flow.initialStepId,
		})
	}, [flow, pathKey, onFlowStart])

	const currentStep = flow?.steps?.[currentStepId] ?? null
	const canGoBack = history.length > 0

	useEffect(() => {
		if (!flow || !currentStep || !currentStepId) return

		onStepChange?.({
			pathKey,
			stepId: currentStepId,
			step: currentStep,
			flow,
			history,
			canGoBack,
		})
	}, [
		pathKey,
		currentStepId,
		currentStep,
		flow,
		history,
		canGoBack,
		onStepChange,
	])

	const goToStep = nextStepId => {
		if (!flow?.steps?.[nextStepId]) return

		setHistory(prev => [...prev, currentStepId])
		setCurrentStepId(nextStepId)
	}

	const handleBack = () => {
		if (!flow || !currentStepId) return

		if (history.length === 0) {
			onFlowExit?.({
				pathKey,
				stepId: currentStepId,
				step: currentStep,
				flow,
			})
			return
		}

		setHistory(prev => {
			const nextHistory = [...prev]
			const previousStepId = nextHistory.pop()
			setCurrentStepId(previousStepId)
			return nextHistory
		})
	}

	const handleActionClick = action => {
		if (!action) return

		if (action.type === 'next') {
			goToStep(action.nextStepId)
			return
		}

		if (action.type === 'link') {
			onLinkOpen?.(action, currentStep, flow)

			if (action.href) {
				window.open(action.href, '_blank', 'noopener,noreferrer')
			}
			return
		}
	}

	if (!flow || !currentStep) {
		return (
			<div className={`${styles.window} ${className}`}>
				<div className={styles.inner}>
					<div className={styles.empty}>No content</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`${styles.window} ${className}`}>
			<div className={styles.inner}>
				<div className={styles.header}>
					<button
						type='button'
						className={styles.backButton}
						onClick={handleBack}
						aria-label='Back step'>
						<ArrowBack className={styles.backIcon} />
					</button>
				</div>

				<div className={styles.body}>
					{currentStep.title ? (
						<h3 className={styles.title}>{currentStep.title}</h3>
					) : null}

					{currentStep.description ? (
						<p className={styles.description}>{currentStep.description}</p>
					) : null}

					{currentStep.media ? (
						<div className={styles.mediaWrap}>
							<img
								className={styles.media}
								src={currentStep.media.src}
								alt={currentStep.media.alt || ''}
							/>
						</div>
					) : null}
				</div>

				<div className={styles.actions}>
					{currentStep.actions?.map(action => (
						<button
							key={action.id || action.label}
							type='button'
							className={
								action.variant === 'secondary'
									? styles.secondaryButton
									: styles.primaryButton
							}
							onClick={() => handleActionClick(action)}>
							{action.label}
						</button>
					))}
				</div>

				{currentStep.caption ? (
					<div className={styles.caption}>{currentStep.caption}</div>
				) : null}
			</div>
		</div>
	)
}
