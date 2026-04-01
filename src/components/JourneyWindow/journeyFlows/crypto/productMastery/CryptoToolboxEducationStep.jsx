import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoToolboxEducationStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>Toolbox Education</h3>

			<div className={stepStyles.textBlock}>
				<p className={stepStyles.bodyText}>
					Toolbox Education explains how to use the available resources,
					learning utilities, and support materials included in the program.
				</p>

				<p className={stepStyles.bodyText}>
					You can either go directly to the live sessions or review the tutorial
					first.
				</p>
			</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() => openLink('https://example.com/toolbox-live-sessions')}>
					Live Sessions
				</button>

				<button
					type='button'
					className={buttonStyles.secondaryButton}
					onClick={() => openLink('https://example.com/toolbox-tutorial')}>
					Tutorial
				</button>
			</div>
		</div>
	)
}
