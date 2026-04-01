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

	const replaceStep = nextStepId => {
		if (!flow?.steps?.[nextStepId]) return

		setStepStack(prev => {
			if (!prev.length) return [nextStepId]
			if (prev[prev.length - 1] === nextStepId) return prev
			return [...prev.slice(0, -1), nextStepId]
		})
	}

	const goBack = () => {
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

	const openLink = actionOrHref => {
		if (!actionOrHref) return

		if (typeof actionOrHref === 'string') {
			window.open(actionOrHref, '_blank', 'noopener,noreferrer')
			return
		}

		onLinkOpen?.(actionOrHref, currentStep, flow)

		if (actionOrHref.href) {
			window.open(actionOrHref.href, '_blank', 'noopener,noreferrer')
		}
	}

	const api = {
		pathKey,
		flow,
		step: currentStep,
		stepId: currentStepId,
		canGoBack,
		historyLength,
		next: goToStep,
		goTo: goToStep,
		replace: replaceStep,
		back: goBack,
		openLink,
		meta: currentStep?.meta ?? null,
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
				{canGoBack && (
					<div className={styles.header}>
						<button
							type='button'
							className={styles.backButton}
							onClick={goBack}
							aria-label='Back step'>
							<ArrowBack className={styles.backIcon} />
						</button>
					</div>
				)}

				<div className={styles.body}>
					{typeof currentStep.render === 'function' ? (
						currentStep.render(api)
					) : (
						<DefaultStep
							step={currentStep}
							onAction={action => handleAction(action, api)}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

function handleAction(action, api) {
	if (!action) return

	if (action.type === 'next' || action.type === 'goTo') {
		api.goTo(action.nextStepId)
		return
	}

	if (action.type === 'replace') {
		api.replace(action.nextStepId)
		return
	}

	if (action.type === 'link') {
		api.openLink(action)
	}
}

function DefaultStep({ step, onAction }) {
	return (
		<>
			{step.title ? <h3>{step.title}</h3> : null}
			{step.description ? <p>{step.description}</p> : null}

			{step.media ? (
				<div>
					<img src={step.media.src} alt={step.media.alt || ''} />
				</div>
			) : null}

			<div>
				{step.actions?.map(action => (
					<button
						key={action.id || action.label}
						type='button'
						onClick={() => onAction(action)}>
						{action.label}
					</button>
				))}
			</div>

			{step.caption ? <div>{step.caption}</div> : null}
		</>
	)
}
