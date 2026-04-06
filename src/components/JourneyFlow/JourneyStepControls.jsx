import { JourneyStepContext } from './JourneyStepContext'
import { useJourneyStep } from './useJourneyStep'
import ArrowBack from '../../assets/arrow-left.svg?react'

export const JourneyStepProvider = ({ value, children }) => {
	return (
		<JourneyStepContext.Provider value={value}>
			{children}
		</JourneyStepContext.Provider>
	)
}

const getDefaultNextLabel = state => {
	if (state.isLastStep) {
		return state.nextPoint ? 'Next point' : 'Complete'
	}

	return 'Next step'
}

export const JourneyPrevButton = ({
	children,
	disabled,
	onClick,
	...props
}) => {
	const { actions, state } = useJourneyStep()

	const handleClick = event => {
		onClick?.(event)
		if (event.defaultPrevented) return

		actions.goToPrevStep()
	}

	return (
		<button
			className='journey-prev-button'
			type='button'
			onClick={handleClick}
			disabled={disabled ?? state.isFirstStep}
			{...props}>
			{children ?? <ArrowBack />}
		</button>
	)
}

export const JourneyNextButton = ({
	children,
	disabled,
	onClick,
	...props
}) => {
	const { actions, state } = useJourneyStep()

	const handleClick = event => {
		onClick?.(event)
		if (event.defaultPrevented) return

		actions.goToNextStep()
	}

	const isCompleted = state.isLastStep && !state.nextPoint

	return (
		<button
			type='button'
			onClick={handleClick}
			disabled={disabled ?? isCompleted}
			{...props}>
			{children ?? getDefaultNextLabel(state)}
		</button>
	)
}

export const JourneyLinkButton = ({
	children,
	link,
	linkTarget,
	linkLabel,
	fallback = null,
	onClick,
	...props
}) => {
	const { actions, state } = useJourneyStep()

	const finalLink = link ?? state.activeStep?.link
	const finalTarget = linkTarget ?? state.activeStep?.linkTarget ?? '_blank'
	const finalLabel =
		children ?? linkLabel ?? state.activeStep?.linkLabel ?? 'go to link'

	if (!finalLink) {
		return fallback
	}

	const handleClick = event => {
		onClick?.(event)
		if (event.defaultPrevented) return

		actions.openLink(finalLink, finalTarget)
	}

	return (
		<button type='button' onClick={handleClick} {...props}>
			{finalLabel}
		</button>
	)
}
