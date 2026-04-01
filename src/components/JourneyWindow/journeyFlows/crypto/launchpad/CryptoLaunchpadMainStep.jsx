import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoLaunchpadMainStep({ next }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>Launchpad</h3>
			<p className={stepStyles.microLabel}>Choose one:</p>

			<div className={stepStyles.inlineActionGrid}>
				<button
					type='button'
					className={`${buttonStyles.secondaryButton} ${buttonStyles['small-33']}`}
					onClick={() => next('crypto-launchpad-onboarding')}>
					Onboarding
				</button>

				<button
					type='button'
					className={`${buttonStyles.secondaryButton} ${buttonStyles['small-33']}`}
					onClick={() => next('crypto-launchpad-broker')}>
					Broker
				</button>

				<button
					type='button'
					className={`${buttonStyles.secondaryButton} ${buttonStyles['small-33']}`}
					onClick={() => next('crypto-launchpad-discord')}>
					Discord
				</button>
			</div>
		</div>
	)
}
