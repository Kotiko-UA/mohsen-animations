import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoBasicsStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>
				WOW Education System: Crypto Basics
			</h3>

			<div className={stepStyles.textBlock}>
				<p className={stepStyles.bodyText}>
					Wow Education System (WES) Crypto Program guides you step by step into
					the world of cryptocurrency and digital assets.
				</p>

				<p className={stepStyles.bodyText}>
					The journey begins with the Basic Level, which introduces core
					concepts such as blockchain fundamentals, cryptocurrencies, wallets,
					exchanges, and security best practices through short, interactive, and
					easy-to-understand modules.
				</p>
			</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() => openLink('https://example.com/crypto-basics')}>
					Take me there!
				</button>
			</div>
		</div>
	)
}
