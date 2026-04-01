import styles from '../../../JourneyCustomSteps.module.css'

export default function StocksLaunchpadStep({ next }) {
	return (
		<div className={styles.windowContent}>
			<h3 className={styles.title}>Launchpad</h3>
			<p className={styles.description}>Choose one:</p>

			<div className={styles.grid}>
				<button
					type='button'
					className={styles.secondaryBtn}
					onClick={() => next('stocks-basics')}>
					Broker
				</button>

				<button
					type='button'
					className={styles.secondaryBtn}
					onClick={() => next('stocks-intermediate')}>
					Discover
				</button>
			</div>
		</div>
	)
}
