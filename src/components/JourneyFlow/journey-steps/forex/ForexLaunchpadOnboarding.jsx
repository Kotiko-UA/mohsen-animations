import { JourneyLinkButton, JourneyPrevButton } from '../../JourneyStepControls'

export default function ForexLaunchpadOnboarding() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<h2 className='text-h-32-700'>Onboarding</h2>
			</div>
			<div className='flex-col-12'>
				<div className='text-h-16-700'>What Happens Next?</div>
				<p className='journey-modal-text'>
					Welcome to the Wow Education System (WES) where your journey to
					excellence begins. <br /> <br /> If you’re new to WES, our dynamic
					onboarding experience is the perfect first step. Designed to inspire
					and empower, these sessions introduce you to our innovative products,
					comprehensive services, and expertly crafted education packages all
					thoughtfully created to support your growth and success. Get ready to
					explore, discover, and unlock the full potential of what WES has to
					offer. Your exciting journey starts here.
				</p>
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
						'https://wowpowers.com/academy-player/fd670358-7dd0-4ff4-adc1-f312dc0361ec'
					}
					className='journey-modal-assent-button'>
					Welcome Tour
				</JourneyLinkButton>
			</div>
		</div>
	)
}
