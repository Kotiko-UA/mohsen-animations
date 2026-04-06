import { JourneyNextButton, JourneyPrevButton } from '../../JourneyStepControls'

export default function CryptoLaunchpadStep2() {
	return (
		<div>
			<h3>Launchpad / Крок 2</h3>
			<p>Тут може бути інший JSX, інша картка, інша розмітка.</p>

			<div className='step-actions'>
				<JourneyPrevButton>Назад</JourneyPrevButton>
				<JourneyNextButton>Далі</JourneyNextButton>
			</div>
		</div>
	)
}
