import {
	JourneyLinkButton,
	JourneyMobileBackToHomeButton,
	JourneyNextButton,
	JourneyPrevButton,
} from '../../JourneyStepControls'
import StarsIcon from '../../../../assets/5-stars.svg?react'

export default function StocksStartStep() {
	return (
		<div className='journey-modal-wrap'>
			<JourneyMobileBackToHomeButton />
			<div className='journey-modal-flex-between'>
				<h2 className='text-h-32-700'>Stocks Journey</h2>
				<div>
					<StarsIcon className='journey-modal-stars' />
					<p className='journey-modal-text'>4.8 (651 reviews)</p>
				</div>
			</div>
			<p className='journey-modal-text'>
				This is a 6–12 month program, and committing to the first 6 months is a
				must because real growth takes time, patience, and heart. These months
				are where your confidence builds and your understanding becomes real.
				You’ll learn to read the market, understand price movement, and start
				getting into the world of Wall Street. <br /> <br /> No shortcuts. No
				rush. <br /> Just steady progress and a journey that helps you grow,
				both as a trader and as a person.
			</p>

			<div className='journey-first-step-bw'>
				<JourneyNextButton className='journey-modal-main-button'>
					Continue
				</JourneyNextButton>
				<p className='journey-modal-text'>
					<span>+2,400</span> already enrolled
				</p>
			</div>
			<div className='journey-modal-fs-sb'>
				<div>
					<div className='journey-modal-fs-sb-1'>
						<div className='text-h-16-700'>5 Comprehensive sections</div>
						<div className='journey-modal-fs-sb-1-st'>
							Learn Wall Street & Enter the market
						</div>
					</div>
					<div className='journey-modal-fs-sb-1'>
						<div className='text-h-16-700'>Levels</div>
						<div className='journey-modal-fs-sb-1-st'>
							Beginner | Intermediate | Advanced
						</div>
					</div>
				</div>
				<div>
					<div className='journey-modal-fs-sb-1 text-h-16-700'>
						Flexible schedule
					</div>
					<div className='journey-modal-fs-sb-1 text-h-16-700'>6-12 months</div>
				</div>
			</div>
		</div>
	)
}
