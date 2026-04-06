import {
	JourneyLinkButton,
	JourneyNextButton,
	JourneyPrevButton,
} from '../../JourneyStepControls'

export default function CryptoOnboardingStep2() {
	return (
		<div>
			<h3>Onboarding / Крок 2</h3>
			<p>Тут теж можна зробити будь-яку власну картку.</p>

			<div className='step-actions'>
				<JourneyPrevButton />
				<JourneyLinkButton>Відкрити матеріал</JourneyLinkButton>
				<JourneyNextButton />
			</div>
		</div>
	)
}
