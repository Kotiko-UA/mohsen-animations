import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/forex-intermediate-img-1.jpg'
export default function ForexIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>
					WOW Education System: Forex Intermediate
				</h2>
			</div>
			<div className='flex-col-24-40'>
				<p className='journey-modal-text'>
					The Intermediate Level introduces the universal principles of trading.
					It teaches you the language of trade, the fundamental tools that all
					traders around the world use to trade. If you master them, you can
					then build your own strategy. This path also include live sessions
					with professional educators so you can directly learn from them and
					ask your questions.
				</p>
				<img src={Img} alt='decorative' className='modal-img' />
			</div>
			<div className='flex-col-24'>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/path/772273f6-d0b4-4edd-9711-6f03b05ef84a'
					}
					className='journey-modal-main-button'>
					Learning Path
				</JourneyLinkButton>
				<JourneyLinkButton
					link={'https://wowpowers.com/schedule'}
					className='journey-modal-assent-button'>
					Live Sessions
				</JourneyLinkButton>
			</div>
		</div>
	)
}
