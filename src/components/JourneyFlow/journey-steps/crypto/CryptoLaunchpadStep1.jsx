import {
	JourneyLinkButton,
	JourneyNextButton,
	JourneyPrevButton,
} from '../../JourneyStepControls'

export default function CryptoLaunchpadStep1() {
	return (
		<div>
			<h3>Launchpad / Крок 1</h3>
			<p>Тут твоя власна верстка.</p>

			<div className='step-actions'>
				<JourneyPrevButton />
				<JourneyLinkButton />
				<JourneyNextButton />
			</div>
		</div>
	)
}
