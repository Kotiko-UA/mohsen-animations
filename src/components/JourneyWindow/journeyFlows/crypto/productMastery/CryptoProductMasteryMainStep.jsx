import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoProductMasteryMainStep({ next }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>
				Product Mastery &amp; Toolbox Education
			</h3>
			<p className={stepStyles.microLabel}>Choose one:</p>

			<div className={stepStyles.inlineActionGrid}>
				<button
					type='button'
					className={`${buttonStyles.secondaryButton} ${buttonStyles['small-33']}`}
					onClick={() => next('crypto-product-mastery-product')}>
					Product Mastery
				</button>

				<button
					type='button'
					className={`${buttonStyles.secondaryButton} ${buttonStyles['small-33']}`}
					onClick={() => next('crypto-product-mastery-toolbox')}>
					Toolbox Education
				</button>
			</div>
		</div>
	)
}
