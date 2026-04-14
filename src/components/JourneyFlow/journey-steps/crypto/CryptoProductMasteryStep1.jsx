import {
	JourneyGoToStepButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'

export default function CryptoProductMasteryStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>Product Mastery & Toolbox Education</h2>
			</div>
			<div className='journey-launchpad-w1'>
				<div className='text-h-20-700'>Choose one:</div>
				<div className='journey-launchpad-w2'>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={2}>
						Product Mastery
					</JourneyGoToStepButton>
					<JourneyGoToStepButton
						className='journey-modal-assent-button'
						stepNumber={3}>
						Toolbox Education
					</JourneyGoToStepButton>
				</div>
			</div>
		</div>
	)
}
