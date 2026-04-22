import {
	JourneyGoToStepButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img2 from '../../../../assets/launchpad--img-2.jpg'
import Img3 from '../../../../assets/launchpad--img-3.jpg'
export default function StocksLaunchpadStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>Launchpad</h2>
			</div>
			<div className='journey-launchpad-w1'>
				<div className='text-h-20-700'>Choose one:</div>
				<div className='journey-launchpad-w2'>
					<div className='flex-col-8'>
						<img className='modal-img' src={Img2} alt='decorative' />
						<JourneyGoToStepButton
							className='journey-modal-assent-button'
							stepNumber={2}>
							Broker
						</JourneyGoToStepButton>
					</div>
					<div className='flex-col-8'>
						<img className='modal-img' src={Img3} alt='decorative' />
						<JourneyGoToStepButton
							className='journey-modal-assent-button'
							stepNumber={4}>
							Discord
						</JourneyGoToStepButton>
					</div>
				</div>
			</div>
		</div>
	)
}
