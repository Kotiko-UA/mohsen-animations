import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/crypto-intermediate-img-1.jpg'
export default function CryptoIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>
					WOW Education System: Crypto Intermediate
				</h2>
			</div>
			<div className='flex-col-24-40'>
				<p className='journey-modal-text'>
					The Intermediate Level focuses on practical market knowledge,
					including crypto market cycles, technical analysis, on-chain
					fundamentals, DeFi concepts, and risk management strategies specific
					to digital assets.
				</p>
				<img src={Img} alt='decorative' className='modal-img' />
			</div>
			<div className='flex-col-24'>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/stream-player/fabrizio_a/livestream/269e3ad4-a86c-4ca2-8dc5-bd33ccb5dba2'
					}
					className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton
					link={'https://wowpowers.com/catalog/paths/30c3ddc5-6b60-4356-922d-0166240dfafa'}
					className='journey-modal-assent-button'>
					Learning Path
				</JourneyLinkButton>
			</div>
		</div>
	)
}
