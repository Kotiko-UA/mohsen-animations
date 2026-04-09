import { JourneyLinkButton, JourneyPrevButton } from '../../JourneyStepControls'
import Img from '../../../../assets/play-button.avif'
export default function ForexAdvanced2() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<h2 className='text-h-32-700'>
					WES Forex Advanced: Select Your Strategy
				</h2>
			</div>
			<div className='journey-modal-dis-sw'>
				<a
					className='f-a-play-wrap'
					href='#'
					target='_blank'
					noopener
					noreferrer
					nofollow>
					<img className='f-a-play-img' src={Img} alt='Play' />
					<div className='text-h-18-500 f-a-play-text'>Confluence Strategy</div>
				</a>
				<a
					className='f-a-play-wrap'
					href='#'
					target='_blank'
					noopener
					noreferrer
					nofollow>
					<img className='f-a-play-img' src={Img} alt='Play' />
					<div className='text-h-18-500 f-a-play-text'>Precision Strategy</div>
				</a>
				<a
					className='f-a-play-wrap'
					href='#'
					target='_blank'
					noopener
					noreferrer
					nofollow>
					<img className='f-a-play-img' src={Img} alt='Play' />
					<div className='text-h-18-500 f-a-play-text'>Geometry Strategy</div>
				</a>
			</div>
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
