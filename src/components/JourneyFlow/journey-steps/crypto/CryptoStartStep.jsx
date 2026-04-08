import { JourneyNextButton } from '../../JourneyStepControls'
import StarsIcon from '../../../../assets/5-stars.svg?react'

export default function CryptoStartStep() {
	return (
		<div className='journey-modal-wrap'>
			<div className='journey-modal-flex-between'>
				<h2 className='text-h-32-700'>Crypto Journey</h2>
				<div>
					<StarsIcon className='journey-modal-stars' />
					<p className='journey-modal-text'>5.0 (745 reviews)</p>
				</div>
			</div>
			<p className='journey-modal-text'>
				This is a 6–12 month program, and committing to the first 6 months is a
				must because real growth takes time, patience, and heart. These months
				are where your confidence builds and your understanding becomes real.
				You’ll learn to read the market, understand price movement, and use
				SageMaster Crypto with purpose and step by step. <br />
				<br /> No shortcuts. No rush. <br /> Just steady progress and a journey
				that helps you grow, both as a trader and as a person.
			</p>

			<div className='journey-first-step-bw'>
				<JourneyNextButton className='journey-modal-main-button'>
					Continue
				</JourneyNextButton>
				<p className='journey-modal-text'>
					<span>+2,500</span> already enrolled
				</p>
			</div>
			<div className='journey-modal-fs-subblock'>
				<div className='journey-modal-fs-you-get'>You get:</div>
				<div className='journey-modal-fs-sb-w'>
					<div className='journey-modal-fs-sb-1'>
						<div className='journey-modal-fs-sb-1-top'>
							<span>6</span>
							<p>comprehensive sections</p>
						</div>
						<p className='journey-modal-fs-sb-1-bottom'>
							Learn Cryptocurrencies & Enter the Market
						</p>
					</div>
					<ul className='journey-modal-fs-sb-2'>
						<li>6-12 months</li>
						<li>Flexible schedule</li>
						<li>Beginner | Intermediate | Advanced</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
