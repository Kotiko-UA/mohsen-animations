import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/crypto-intermediate-img-1.jpg'

export default function StocksIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
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
				<JourneyLinkButton
					link={
						'https://wowpowers.com/stream-player/enrico/livestream/cff6b309-7303-4695-953f-a090ca5aac52'
					}
					className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/path/0db8991e-f47c-458f-a9cc-043f2d7fc56d'
					}
					className='journey-modal-assent-button'>
					Learning Path
				</JourneyLinkButton>
			</div>
		</div>
	)
}
