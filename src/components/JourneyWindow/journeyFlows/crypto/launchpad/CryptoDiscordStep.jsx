import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoDiscordStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>Crypto Discord</h3>

			<p className={stepStyles.bodyText}>
				In addition to all the resources we’ve already provided, we also have an
				active Discord community for communication, discussion, and crypto
				market analysis.
			</p>

			<div className={stepStyles.discordLayout}>
				<div className={stepStyles.discordContent}>
					<h4 className={stepStyles.textTitle}>
						Have you been in our Discord servers before?
					</h4>

					<div className={stepStyles.discordButtons}>
						<button
							type='button'
							className={buttonStyles.secondaryButton}
							onClick={() => openLink('https://example.com/discord-new')}>
							No
						</button>

						<button
							type='button'
							className={buttonStyles.primaryButton}
							onClick={() => openLink('https://example.com/discord-existing')}>
							Yes
						</button>
					</div>

					<div className={stepStyles.discordHints}>
						<div>Click NO if you would like to join</div>
						<div>Click YES if you’re already in the server</div>
					</div>
				</div>

				<div className={stepStyles.discordPreview}>Discord preview</div>
			</div>
		</div>
	)
}
