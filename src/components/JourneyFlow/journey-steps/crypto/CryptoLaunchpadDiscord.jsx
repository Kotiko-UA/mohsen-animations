import {
	JourneyLinkButton,
	JourneyGoToStepButton,
} from '../../JourneyStepControls'
import DiscordImg from '../../../../assets/discord-img.jpg'
export default function CryptoLaunchpadDiscord() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton back={true} stepNumber={1} />
				<h2 className='text-h-32-700'>Crypto Discord</h2>
			</div>
			<p className='journey-modal-text'>
				In addition to all the resources we have provided for you, we have an
				active Discord channel as well for communications, discussions and
				analysis about the Crypto Market.
			</p>
			<div className='journey-modal-dis-sw'>
				<div className='flex-col-24'>
					<div className='text-h-24-500'>
						Have you been in our discord servers before?
					</div>
					<div className='flex-col-18'>
						<div className='flex-row-12'>
							<JourneyLinkButton
								link={
									'https://discord.com/channels/1084814874393194527/1134143656098541698'
								}
								className='journey-modal-main-button'>
								No
							</JourneyLinkButton>
							<p className='text-p-14 w-full'>
								Click NO if you need the invite link.
							</p>
						</div>
						<div className='flex-row-12'>
							<JourneyLinkButton
								link={'#'}
								className='journey-modal-main-button'>
								Yes
							</JourneyLinkButton>
							<p className='text-p-14 w-full'>
								Click YES if you've already entered the servers.
							</p>
						</div>
					</div>
				</div>
				<img src={DiscordImg} alt='discord' className='cr-l-dis-img' />
			</div>
		</div>
	)
}
