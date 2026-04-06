import { JourneyNextButton, JourneyPrevButton } from '../../JourneyStepControls'

export default function CryptoOnboardingStep1() {
	return (
		<div>
			<h3>Onboarding / Крок 1</h3>
			<p>Друга точка. Вона буде закрита, поки не дійдеш до кінця першої.</p>

			<div className='step-actions'>
				<JourneyPrevButton />
				<JourneyNextButton />
			</div>
		</div>
	)
}
