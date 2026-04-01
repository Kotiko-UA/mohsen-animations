import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoIntermediateStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>
				WOW Education System: Crypto Intermediate
			</h3>

			<div className={stepStyles.textBlock}>
				<p className={stepStyles.bodyText}>
					The intermediate level builds on the basics and introduces more
					structured market analysis, practical decision-making, and deeper
					understanding of crypto opportunities.
				</p>

				<p className={stepStyles.bodyText}>
					This stage is designed for users who already understand the
					fundamentals and want to develop stronger execution habits.
				</p>
			</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() =>
						openLink('https://example.com/crypto-intermediate-live')
					}>
					Live Sessions
				</button>

				<button
					type='button'
					className={buttonStyles.secondaryButton}
					onClick={() =>
						openLink('https://example.com/crypto-intermediate-path')
					}>
					Learning Path
				</button>
			</div>
		</div>
	)
}
