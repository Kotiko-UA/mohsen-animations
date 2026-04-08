import { JourneyLinkButton } from '../../JourneyStepControls'

export default function CryptoIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>
					WOW Education System: Crypto Intermediate
				</h2>
			</div>
			<p className='journey-modal-text'>
				The Intermediate Level focuses on practical market knowledge, including
				crypto market cycles, technical analysis, on-chain fundamentals, DeFi
				concepts, and risk management strategies specific to digital assets.
			</p>
			<div className='flex-col-24'>
				<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton
					disabled
					link={'#'}
					className='journey-modal-assent-button'>
					Learning Path (Coming Soon)
				</JourneyLinkButton>
			</div>
		</div>
	)
}
