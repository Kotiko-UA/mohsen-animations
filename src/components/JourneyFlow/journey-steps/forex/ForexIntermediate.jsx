import { JourneyLinkButton } from '../../JourneyStepControls'

export default function ForexIntermediate() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<h2 className='text-h-32-700'>
					WOW Education System: Forex Intermediate
				</h2>
			</div>
			<p className='journey-modal-text'>
				The Intermediate Level introduces the universal principles of trading.
				It teaches you the language of trade, the fundamental tools that all
				traders around the world use to trade. If you master them, you can then
				build your own strategy. This path also include live sessions with
				professional educators so you can directly learn from them and ask your
				questions.
			</p>
			<div className='flex-col-24'>
				<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
					Learning Path
				</JourneyLinkButton>
				<JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Live Sessions
				</JourneyLinkButton>
			</div>
		</div>
	)
}
