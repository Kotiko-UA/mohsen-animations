import { useEffect, useMemo, useRef, useState } from 'react'
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

	const initialStepId = flow?.initialStepId ?? null

	const [stepStack, setStepStack] = useState(() =>
		initialStepId ? [initialStepId] : [],
	)

	const lastReportedSignatureRef = useRef('')

	const currentStepId =
		stepStack.length > 0 ? stepStack[stepStack.length - 1] : null

	const currentStep = currentStepId
		? (flow?.steps?.[currentStepId] ?? null)
		: null
	const canGoBack = stepStack.length > 1
	const historyLength = Math.max(0, stepStack.length - 1)

	useEffect(() => {
		if (!pathKey || !initialStepId) return

		onFlowStart?.({
			pathKey,
			initialStepId,
		})
	}, [pathKey, initialStepId, onFlowStart])

	useEffect(() => {
		if (!flow || !currentStep || !currentStepId) return

		const reportSignature = [
			pathKey ?? 'null',
			currentStepId,
			canGoBack ? '1' : '0',
			historyLength,
		].join('::')

		if (lastReportedSignatureRef.current === reportSignature) return
		lastReportedSignatureRef.current = reportSignature

		onStepChange?.({
			pathKey,
			stepId: currentStepId,
			step: currentStep,
			canGoBack,
			historyLength,
			meta: currentStep.meta ?? null,
		})
	}, [
		pathKey,
		currentStepId,
		currentStep,
		canGoBack,
		historyLength,
		flow,
		onStepChange,
	])

	const goToStep = nextStepId => {
		if (!flow?.steps?.[nextStepId]) return

		setStepStack(prev => {
			if (prev[prev.length - 1] === nextStepId) return prev
			return [...prev, nextStepId]
		})
	}

	const handleBack = () => {
		if (!flow || !currentStepId) return

		if (stepStack.length <= 1) {
			onFlowExit?.({
				pathKey,
				stepId: currentStepId,
				step: currentStep,
			})
			return
		}

		setStepStack(prev => prev.slice(0, -1))
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
