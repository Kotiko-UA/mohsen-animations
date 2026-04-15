import { useState } from 'react'
import StarsIcon from '../../../../assets/5-stars.svg?react'
import { useJourneyStep } from '../../useJourneyStep'
import {
	getCommitmentMinutes,
	saveCommitment,
} from '../../../../utils/journeyCommitments'
import { JourneyMobileBackToHomeButton } from '../../JourneyStepControls'

const commitmentOptions = [
	{ id: '20-min', label: '20 min/day', value: 20 },
	{ id: '30-min', label: '30 min/day', value: 30 },
	{ id: '60-min', label: '60 min/day', value: 60 },
	{ id: '2-hours', label: '2 hrs/day', value: 120 },
]

const journeyType = 'Crypto'

const getInitialCommitmentId = () => {
	const storedValue = getCommitmentMinutes(journeyType)

	return (
		commitmentOptions.find(option => option.value === storedValue)?.id ??
		'60-min'
	)
}

export default function HowMuchTime() {
	const { actions } = useJourneyStep()
	const [activeCommitmentId, setActiveCommitmentId] = useState(
		getInitialCommitmentId,
	)

	const activeCommitment =
		commitmentOptions.find(option => option.id === activeCommitmentId) ??
		commitmentOptions[2]

	const handleCommitmentClick = option => {
		setActiveCommitmentId(option.id)
		saveCommitment(journeyType, option.value)
	}

	const handleContinue = () => {
		saveCommitment(journeyType, activeCommitment.value)
		actions.unlockPointsOverview()
	}

	return (
		<div className='journey-modal-wrap'>
			<JourneyMobileBackToHomeButton />
			<div className='journey-modal-flex-between'>
				<h2 className='text-h-32-700'>Crypto Journey</h2>

				<div>
					<StarsIcon className='journey-modal-stars' />
					<p className='journey-modal-text'>5.0 (745 reviews)</p>
				</div>
			</div>

			<p className='journey-modal-text'>
				Having a clear plan increases your chances of success and keeps you
				committed to your learning. Create a consistent study routine by setting
				daily hour commitments.
			</p>

			<div className='journey-modal-ht-subwrap'>
				<div className='text-h-20-700'>
					How much time can you commit each day?
				</div>

				<div className='journey-modal-time-options'>
					{commitmentOptions.map(option => {
						const isActive = option.id === activeCommitmentId

						return (
							<button
								key={option.id}
								type='button'
								className={
									isActive
										? 'journey-modal-main-button h40'
										: 'journey-modal-assent-button h40'
								}
								onClick={() => handleCommitmentClick(option)}>
								{option.label}
							</button>
						)
					})}
				</div>
			</div>

			<div className='journey-first-step-bw'>
				<button onClick={handleContinue} className='journey-modal-main-button'>
					Continue
				</button>

				<p className='journey-modal-text'>
					Your commitment: <span>{activeCommitment.label}</span> for the next{' '}
					<span>6 months</span>
				</p>
			</div>
		</div>
	)
}
