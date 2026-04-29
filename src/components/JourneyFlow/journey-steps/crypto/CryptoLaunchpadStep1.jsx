import {
	JourneyGoToStepButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img1 from '../../../../assets/launchpad--img-1.jpg'
import Img2 from '../../../../assets/launchpad--img-2.jpg'
import Img3 from '../../../../assets/launchpad--img-3.jpg'
import PlusIcon from '../../../../assets/button-plus-icon.svg?react'
export default function CryptoLaunchpadStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />

				<h2 className='text-h-32-700'>Launchpad</h2>
			</div>
			<div className='journey-launchpad-w1'>
				<div className='text-h-20-700'>Choose one:</div>
				<div className='journey-launchpad-w3'>
					<div className='flex-col-8'>
						<img className='modal-img' src={Img1} alt='decorative' />
						<JourneyGoToStepButton
							className='journey-modal-main-button'
							stepNumber={2}>
							Onboarding
							<PlusIcon />
						</JourneyGoToStepButton>
					</div>
					<div className='flex-col-8'>
						<img className='modal-img' src={Img2} alt='decorative' />
						<JourneyGoToStepButton
							className='journey-modal-main-button'
							stepNumber={3}>
							Broker
							<PlusIcon />
						</JourneyGoToStepButton>
					</div>
					<div className='flex-col-8'>
						<img className='modal-img' src={Img3} alt='decorative' />
						<JourneyGoToStepButton
							className='journey-modal-main-button'
							stepNumber={5}>
							Discord
							<PlusIcon />
						</JourneyGoToStepButton>
					</div>
				</div>
			</div>
		</div>
	)
}
