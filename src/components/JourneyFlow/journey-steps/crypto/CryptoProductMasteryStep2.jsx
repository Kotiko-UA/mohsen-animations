import {
	JourneyGoToStepButton,
	JourneyLinkButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/prod-m-img.jpg'

export default function CryptoProductMasteryStep2() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton
					back={true}
					stepNumber={1}></JourneyGoToStepButton>
				<h2 className='text-h-32-700'>Product Mastery & Toolbox Education</h2>
			</div>
			<div className='journey-modal-text'>
				SageMaster offers several strong and solid tools to make crypto trade
				easy. To learn how to use these tools, we have developed a detailed and
				step-by-step playbook to walk you through all the steps with extra
				explanations, scenarios and descriptions. Educate yourself about the
				tools and techniques and start using SageMaster Crypto.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<JourneyLinkButton
				link={
					'https://wowpowers.com/catalog/paths/6f356a3e-3eff-4d91-8e48-61f0b13fac1f'
				}
				className='journey-modal-main-button'>
				Take me there!
			</JourneyLinkButton>
		</div>
	)
}
