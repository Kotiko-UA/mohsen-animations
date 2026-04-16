import {
	JourneyGoToStepButton,
	JourneyLinkButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/forex-mastery-1.jpg'

export default function ForexProductMasteryStep2() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton
					back={true}
					stepNumber={1}></JourneyGoToStepButton>
				<h2 className='text-h-32-700'>Product Mastery & Toolbox Education</h2>
			</div>
			<div className='journey-modal-text'>
				Once your account is connected, it's time to explore the tools! The
				Product Mastery Playbook walks you through each feature in a fun,
				hands-on, and simulated environment so you can confidently put them into
				action.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<JourneyLinkButton
				link={
					'https://wowpowers.com/catalog/paths/cfe10bdb-bb60-4cc3-bfd4-9033e771c309#'
				}
				className='journey-modal-main-button'>
				Take me there!
			</JourneyLinkButton>
		</div>
	)
}
