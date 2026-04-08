import { JourneyGoToStepButton } from '../../JourneyStepControls'

export default function CryptoLaunchpadStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>Launchpad</h2>
			</div>
			<div className='journey-launchpad-w1'>
				<div className='text-h-20-700'>
					How much time can you commit each day?
				</div>
				<div className='journey-launchpad-w2'>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={2}>
						Onboarding
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={3}>
						Broker
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={5}>
						Discord
					</JourneyGoToStepButton>
				</div>
			</div>
		</div>
	)
}
