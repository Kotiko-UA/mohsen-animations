import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoExchangeDiscoveryStep({ next, openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>Exchange Discovery</h3>

			<div className={stepStyles.textBlock}>
				<h4 className={stepStyles.textTitle}>Why You’re Seeing This?</h4>

				<p className={stepStyles.bodyText}>
					Before entering the crypto market, you need access to a broker or
					exchange. This screen introduces the concept and helps you understand
					why the next step matters.
				</p>

				<p className={stepStyles.bodyText}>
					We do not endorse any specific broker or exchange. The information
					here is educational and intended to help you evaluate which solution
					may fit your personal needs.
				</p>

				<h4 className={stepStyles.textTitle}>What Happens Next?</h4>

				<p className={stepStyles.bodyText}>
					You’ll review an educational disclaimer and then decide whether to
					continue to a third-party provider or open the tutorial first.
				</p>
			</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() => next('crypto-launchpad-broker-confirm')}>
					Continue
				</button>

				<button
					type='button'
					className={buttonStyles.secondaryButton}
					onClick={() =>
						openLink('https://example.com/crypto-broker-tutorial')
					}>
					Tutorial
				</button>
			</div>
		</div>
	)
}
