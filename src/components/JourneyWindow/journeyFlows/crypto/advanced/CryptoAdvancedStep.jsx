import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoAdvancedStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>
				WOW Education System: Crypto Advanced
			</h3>

			<div className={stepStyles.textBlock}>
				<p className={stepStyles.bodyText}>
					The advanced level focuses on refinement, deeper market context, and
					more confident execution supported by experience and structured
					learning.
				</p>

				<p className={stepStyles.bodyText}>
					This module is intended for learners who want to move beyond the
					intermediate stage and continue improving their process.
				</p>
			</div>

			<div className={stepStyles.imageCard}>Advanced education preview</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() => openLink('https://example.com/crypto-advanced-live')}>
					Live Sessions
				</button>

				<button
					type='button'
					className={buttonStyles.secondaryButton}
					onClick={() => openLink('https://example.com/crypto-advanced-path')}>
					Learning Path
				</button>
			</div>
		</div>
	)
}
