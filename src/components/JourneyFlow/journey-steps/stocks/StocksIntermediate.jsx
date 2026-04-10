import { JourneyLinkButton } from '../../JourneyStepControls'
import Img from '../../../../assets/crypto-advanced.jpg'

export default function StocksIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>
					WOW Education System: Stocks Intermediate
				</h2>
			</div>
			<div className='journey-modal-text'>
				The Intermediate Level focuses on core market skills, including
				fundamental analysis, technical analysis, market cycles, sector
				rotation, and valuation principles used across global equity markets.
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
