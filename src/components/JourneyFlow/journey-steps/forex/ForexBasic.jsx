import { JourneyLinkButton } from '../../JourneyStepControls'
import Img from '../../../../assets/forex-basic.jpg'

export default function ForexBasic() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>WOW Education System: Forex Basics</h2>
			</div>
			<div className='journey-modal-text'>
				Wow Education System (WES) guides you step by step into the world of
				Forex trading. The journey begins with the Basic Level, featuring 20
				short, interactive, and engaging modules that explain Forex trading
				concepts in a clear and simple manner.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
				Take me there!
			</JourneyLinkButton>
		</div>
	)
}
