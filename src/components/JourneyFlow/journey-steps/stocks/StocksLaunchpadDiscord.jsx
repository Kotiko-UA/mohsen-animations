import {
	JourneyLinkButton,
	JourneyGoToStepButton,
} from '../../JourneyStepControls'
import DiscordImg from '../../../../assets/discord-img.jpg'
export default function StocksLaunchpadDiscord() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyGoToStepButton back={true} stepNumber={1} />
				<h2 className='text-h-32-700'>Stocks Discord</h2>
			</div>
			<p className='journey-modal-text'>
				In addition to all the resources we have provided for you, we have an
				active Discord channel as well for communications, discussions and
				analysis about the Stocks Market.
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
									'https://discord.com/channels/1044261187812073513/1435531050930536478'
								}
								className='journey-modal-main-button journey-modal-dis-button'>
								No
							</JourneyLinkButton>
							<p className='text-p-14 w-full'>
								Click NO if you need the invite link.
							</p>
						</div>
						<div className='flex-row-12'>
							<JourneyGoToStepButton
								stepNumber={1}
								className='journey-modal-main-button journey-modal-dis-button'>
								Yes
							</JourneyGoToStepButton>
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
