import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/stock-advanced-img.jpg'

export default function StockAdvanced() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>WOW Education System: Stocks Advanced</h2>
			</div>
			<div className='journey-modal-text'>
				In the Advanced Level, you work closely with our professional educators
				to gain hands-on experience in real-world market scenarios, advanced
				trading and investing strategies, portfolio construction, risk
				optimization, and long-term wealth-building approaches.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<div className='flex-col-24'>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/stream-player/enrico/livestream/ad1aa74a-8dac-4d0e-87bf-3106ce8a552f'
					}
					className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/path/b5de8cf0-4305-4df8-b645-137421c41372'
					}
					className='journey-modal-assent-button'>
					Learning Path
				</JourneyLinkButton>
			</div>
		</div>
	)
}
