import {
	JourneyLinkButton,
	JourneyNextButton,
	JourneyPrevButton,
	JourneyGoToStepButton,
} from '../../JourneyStepControls'

export default function CryptoLaunchpadStep1() {
	return (
		<div className='journey-modal-wrap'>
			<JourneyPrevButton />
			<h2 className='journey-modal-title'>Launchpad</h2>
			<div className='journey-launchpad-w1'>
				<div className='journey-modal-subtitle'>
					How much time can you commit each day?
				</div>
				<div className='journey-launchpad-w2'>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						step={1}>
						Onboarding
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						step={1}>
						Broker
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						step={1}>
						Discord
					</JourneyGoToStepButton>
				</div>
			</div>
		</div>
	)
}
