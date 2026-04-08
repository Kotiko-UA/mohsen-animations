import {
	JourneyLinkButton,
	JourneyNextButton,
	JourneyGoToStepButton,
} from '../../JourneyStepControls'

export default function CryptoLaunchpadBroker1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton back={true} stepNumber={1} />
				<h2 className='text-h-32-700'>Exchange Discovery</h2>
			</div>
			<div className='flex-col-24'>
				<div className='flex-col-12'>
					<div className='text-h-16-700'>What Happens Next?</div>
					<p className='journey-modal-text'>
						We often receive questions like: “Which broker should I choose?” WOW
						is an education and software platform, so we don’t operate brokers
						and we don’t recommend any specific one. Because of this, some users
						end up choosing brokers on their own without having clear or
						consistent information. To help with that, WOW directs you to an
						independent third-party website that provides transparent
						information about different brokers, so you can make your own
						informed decision.
					</p>
				</div>
				<div className='flex-col-12'>
					<div className='text-h-16-700'>What Happens Next?</div>
					<p className='journey-modal-text'>
						When you continue: You will be directed to XCONNECTLY, an
						independent third-party platform. XCONNECTLY provides broker
						information and comparison tools only. You can review broker details
						and decide what works best for you. If you choose to open an
						account, it is done directly with the broker. WOW does not choose
						brokers for you and does not tell you which broker to use.
					</p>
				</div>
			</div>
			<div className='flex-col-24'>
				<JourneyNextButton className='journey-modal-main-button'>
					Continue
				</JourneyNextButton>
				<JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Tutorial
				</JourneyLinkButton>
			</div>
		</div>
	)
}
