import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'

export default function CryptoOnboardingStep1() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>WOW Education System: Crypto Basics</h2>
			</div>
			<p className='journey-modal-text'>
				<span>Wow Education System (WES) Crypto Program</span> guides you step
				by step into the world of cryptocurrency and digital assets. The journey
				begins with the <span>Basic Level</span>, which introduces core concepts
				such as blockchain fundamentals, cryptocurrencies, wallets, exchanges,
				and security best practices through short, interactive, and
				easy-to-understand modules.
			</p>

			<JourneyLinkButton
				link={
					'https://wowpowers.com/catalog/paths/d72c025a-c289-482e-b0ef-0536529da0f9'
				}
				className='journey-modal-main-button'>
				Take me there!
			</JourneyLinkButton>
		</div>
	)
}
