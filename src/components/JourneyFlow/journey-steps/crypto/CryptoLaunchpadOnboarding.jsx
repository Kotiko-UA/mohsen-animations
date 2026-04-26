import { JourneyLinkButton, JourneyPrevButton } from '../../JourneyStepControls'
import Img from '../../../../assets/on-boarding-img-1.jpg'
export default function CryptoLaunchpadOnboarding() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<h2 className='text-h-32-700'>Onboarding</h2>
			</div>
			<div className='modal-img-flex-wrap'>
				<div className='flex-col-12'>
					<div className='text-h-16-700'>What Happens Next?</div>
					<p className='journey-modal-text'>
						Welcome to the Wow Education System (WES) where your journey to
						excellence begins. <br /> <br /> If you’re new to WES, our dynamic
						onboarding experience is the perfect first step. Designed to inspire
						and empower, these sessions introduce you to our innovative
						products, comprehensive services, and expertly crafted education
						packages all thoughtfully created to support your growth and
						success. Get ready to explore, discover, and unlock the full
						potential of what WES has to offer. Your exciting journey starts
						here.
					</p>
				</div>
				<img src={Img} alt='decorative' className='modal-img' />
			</div>
			<div className='flex-col-24'>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/stream-player/launchpad/livestream/4723525f-0ef0-4137-9b31-7f80d61887d1'
					}
					className='journey-modal-main-button'>
					Live Sessions
				</JourneyLinkButton>
				<JourneyLinkButton
					link={
						'https://augerafiles-my.sharepoint.com/personal/mohsenh_augmentedera_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fmohsenh_augmentedera_com%2FDocuments%2FL%20%26%20D%2F.story%20works%2FOnboarding%20videos%2FWow%20and%20SageMaster%20Welcome%20Tour_3.mp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&ga=1&referrer=StreamWebApp.Web&referrerScenario=AddressBarCopied.view.4a4d2935-c1ef-486f-82fc-b2ecad51447a'
					}
					className='journey-modal-assent-button'>
					Welcome Tour
				</JourneyLinkButton>
			</div>
		</div>
	)
}
