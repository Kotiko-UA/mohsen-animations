import { JourneyNextButton, JourneyPrevButton } from '../../JourneyStepControls'

export default function CryptoExchangeDiscoveryStep1() {
	return (
		<div>
			<h3>Exchange Discovery / Крок 1</h3>
			<p>Третя точка.</p>

			<div className='step-actions'>
				<JourneyPrevButton />
				<JourneyNextButton />
			</div>
		</div>
	)
}
