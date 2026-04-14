import {
	JourneyMobileBackToPointsButton,
	JourneyNextButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/forex-advanced-1.jpg'

export default function ForexAdvanced() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>WOW Education System: Forex Advanced</h2>
			</div>
			<div className='journey-modal-text'>
				The Advanced Level connects you directly to our Professional educators
				for an in-depths exploration of real-world trading practices. You can
				see how they manage the see the nuances of the market, manage their
				emotions and execute trades. You will live in the world of trade with
				them.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<JourneyNextButton className='journey-modal-main-button'>
				Select Your Strategy
			</JourneyNextButton>
		</div>
	)
}
