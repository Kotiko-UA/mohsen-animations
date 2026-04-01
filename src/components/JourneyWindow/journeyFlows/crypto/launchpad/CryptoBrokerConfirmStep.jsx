import { useMemo, useState } from 'react'
import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

const CHECKBOXES = [
	'I understand that trading carries risk and may not be suitable for everyone',
	'I understand I am being directed to an independent third-party website',
	'I understand that WOW is not a broker and does not provide trading or investment advice',
	'I understand my broker choice is my own decision and responsibility',
]

export default function CryptoBrokerConfirmStep({ openLink }) {
	const [checked, setChecked] = useState([true, false, false, false])

	const allChecked = useMemo(() => checked.every(Boolean), [checked])

	const toggle = index => {
		setChecked(prev => prev.map((item, i) => (i === index ? !item : item)))
	}

	return (
		<div className={stepStyles.windowContent}>
			<div className={stepStyles.topMetaRow}>
				<div className={stepStyles.metaLabel}>You choose:</div>
				<h3 className={stepStyles.titleMdCenter}>Exchange Discovery</h3>
			</div>

			<div className={stepStyles.textBlock}>
				<h4 className={stepStyles.textTitle}>Before You Continue</h4>

				<p className={stepStyles.bodyText}>
					Trading involves risk and may not be suitable for all investors.
					Please review the information carefully before proceeding.
				</p>

				<p className={stepStyles.bodyText}>
					WOW acts only as an educational platform and does not provide broker
					services, account management, or personal investment advice.
				</p>

				<p className={stepStyles.bodyText}>
					Any account you open and any activity you take on a third-party
					website remains solely your responsibility.
				</p>

				<h4 className={stepStyles.textTitle}>
					Please Confirm Before Proceeding:
				</h4>
			</div>

			<div className={stepStyles.checkList}>
				{CHECKBOXES.map((label, index) => (
					<label key={label} className={stepStyles.checkItem}>
						<input
							type='checkbox'
							checked={checked[index]}
							onChange={() => toggle(index)}
						/>
						<span>{label}</span>
					</label>
				))}
			</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					disabled={!allChecked}
					onClick={() => openLink('https://example.com/crypto-broker')}>
					Take me there!
				</button>
			</div>
		</div>
	)
}
