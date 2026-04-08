import { useState } from 'react'
import { JourneyLinkButton, JourneyPrevButton } from '../../JourneyStepControls'

export default function CryptoLaunchpadBroker2() {
	const [confirmations, setConfirmations] = useState({
		risk: false,
		thirdParty: false,
		notBroker: false,
		responsibility: false,
	})

	const handleChange = key => event => {
		setConfirmations(prev => ({
			...prev,
			[key]: event.target.checked,
		}))
	}

	const isConfirmed = Object.values(confirmations).every(Boolean)

	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<div className='journey-modal-flex-between'>
					<div className='journey-modal-title-opacity'>You choose:</div>
					<h2 className='journey-modal-title'>Exchange Discovery</h2>
				</div>
			</div>

			<div className='flex-col-12'>
				<div className='text-h-16-700'>Before You Continue</div>
				<p className='journey-modal-text'>
					Please read the following carefully. Trading involves risk and may not
					be suitable for all individuals. You should carefully consider your
					financial situation, experience, and risk tolerance before opening a
					brokerage account or engaging in any trading activity. WOW is an
					education and software platform. It does not operate brokers, provide
					brokerage services, or offer financial, investment, or trading advice.
					WOW does not recommend or endorse brokers and does not act as an
					introducing broker, intermediary, or agent for any broker. You are
					being redirected to XCONNECTLY, an independent third-party platform
					that provides informational tools about brokers. Any broker account
					you open, and any trading activity you engage in, will be entirely
					between you and the broker you choose, under that broker’s terms,
					conditions, and risk disclosures.
				</p>
			</div>

			<div className='flex-col-24'>
				<div className='text-h-24-500'>Please Confirm Before Proceeding:</div>

				<div className='journey-confirm-list'>
					<label className='journey-confirm-item'>
						<input
							className='journey-confirm-checkbox'
							type='checkbox'
							checked={confirmations.risk}
							onChange={handleChange('risk')}
						/>
						<span className='text-h-16-500'>
							I understand that trading carries risk and may not be suitable for
							everyone
						</span>
					</label>

					<label className='journey-confirm-item'>
						<input
							className='journey-confirm-checkbox'
							type='checkbox'
							checked={confirmations.thirdParty}
							onChange={handleChange('thirdParty')}
						/>
						<span className='text-h-16-500'>
							I understand I am being directed to an independent third-party
							website (XCONNECTLY)
						</span>
					</label>

					<label className='journey-confirm-item'>
						<input
							className='journey-confirm-checkbox'
							type='checkbox'
							checked={confirmations.notBroker}
							onChange={handleChange('notBroker')}
						/>
						<span className='text-h-16-500'>
							I understand that WOW is not a broker and does not provide trading
							or investment advice
						</span>
					</label>

					<label className='journey-confirm-item'>
						<input
							className='journey-confirm-checkbox'
							type='checkbox'
							checked={confirmations.responsibility}
							onChange={handleChange('responsibility')}
						/>
						<span className='text-h-16-500'>
							I understand any broker I choose is my own decision and
							responsibility
						</span>
					</label>
				</div>
			</div>

			<div className='flex-col-24'>
				<JourneyLinkButton
					disabled={!isConfirmed}
					link='#'
					className='journey-modal-main-button'>
					Take me there!
				</JourneyLinkButton>
			</div>
		</div>
	)
}
