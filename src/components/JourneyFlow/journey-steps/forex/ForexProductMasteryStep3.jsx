import {
	JourneyGoToStepButton,
	JourneyLinkButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/forex-mastery-2.jpg'

export default function ForexProductMasteryStep3() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton
					back={true}
					stepNumber={1}></JourneyGoToStepButton>
				<h2 className='text-h-32-700'>Toolbox Education</h2>
			</div>
			<div className='journey-modal-text'>
				Product Mastery gives you the foundation, but Toolbox Tuesdays take it
				further. Join our weekly live sessions with expert educators to get your
				questions answered, dive deeper into the tools, and learn advanced tips.
				You can also catch up anytime with session recordings.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<div className='flex-col-24'>
				<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
					Take me there!
				</JourneyLinkButton>
				<JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Live Sessions
				</JourneyLinkButton>
			</div>
		</div>
	)
}
