import {
	JourneyGoToStepButton,
	JourneyLinkButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/prod-m-img.jpg'

export default function CryptoProductMasteryStep3() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton back={true} stepNumber={1} />
				<h2 className='text-h-32-700'>Toolbox Education</h2>
			</div>
			<div className='flex-col-12'>
				<div className='text-h-16-700'>What Happens Next?</div>
				<p className='journey-modal-text'>
					If you need more support on using SageMaster tools, if you need an
					experienced educator helping you in the process, if you need someone
					to answer your questions, Toolbox Tuesdays is for you. Every week on
					Tuesdays, we have live sessions in 6 time zones for you to join and
					ask your questions. We currently offer English in Europe and Latin
					America time zones, Spanish in Europe and Latin America time zones,
					German, Italian and Polish. You can also watch the recordings of the
					previous sessions.
				</p>
			</div>
			<div className='flex-col-24'>
				<JourneyLinkButton link={'#'} className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Tutorial
				</JourneyLinkButton>
			</div>
		</div>
	)
}
