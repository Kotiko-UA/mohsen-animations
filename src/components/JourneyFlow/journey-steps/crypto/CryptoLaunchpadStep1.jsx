import {
	JourneyLinkButton,
	JourneyNextButton,
	JourneyPrevButton,
	JourneyGoToStepButton,
} from '../../JourneyStepControls'

export default function CryptoLaunchpadStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<h2 className='journey-modal-title'>Launchpad</h2>
			</div>
			<div className='journey-launchpad-w1'>
				<div className='journey-modal-subtitle'>
					How much time can you commit each day?
				</div>
				<div className='journey-launchpad-w2'>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={4}>
						Onboarding
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={5}>
						Broker
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={1}>
						Discord
					</JourneyGoToStepButton>
				</div>
			</div>
		</div>
	)
}
