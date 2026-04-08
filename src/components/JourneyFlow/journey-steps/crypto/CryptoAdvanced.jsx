import { JourneyLinkButton } from '../../JourneyStepControls'
import Img from '../../../../assets/crypto-advanced.jpg'

export default function CryptoAdvanced() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>WOW Educaton System: Crypto Advanced</h2>
			</div>
			<div className='journey-modal-text'>
				In the Advanced Level, you gain direct access to our professional
				educators and analysts to explore advanced trading strategies, portfolio
				management, real-world market scenarios, and emerging trends in the
				crypto ecosystem.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<div className='flex-col-24'>
				<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Learning Path
				</JourneyLinkButton>
			</div>
		</div>
	)
}
