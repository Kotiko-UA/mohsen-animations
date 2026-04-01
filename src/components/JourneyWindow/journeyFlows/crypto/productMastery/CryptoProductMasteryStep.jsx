import stepStyles from '../../../JourneyCustomSteps.module.css'
import buttonStyles from '../../../JourneyWindow.module.css'

export default function CryptoProductMasteryStep({ openLink }) {
	return (
		<div className={stepStyles.windowContent}>
			<h3 className={stepStyles.titleMd}>Product Mastery</h3>

			<div className={stepStyles.textBlock}>
				<p className={stepStyles.bodyText}>
					This section introduces the tools and workflow used in the product
					mastery environment. It helps you understand what each tool does and
					how it can support your crypto research and learning process.
				</p>
			</div>

			<div className={stepStyles.imageCard}>Product / chart preview</div>

			<div className={stepStyles.bottomActions}>
				<button
					type='button'
					className={buttonStyles.primaryButton}
					onClick={() => openLink('https://example.com/product-mastery')}>
					Take me there!
				</button>
			</div>
		</div>
	)
}
