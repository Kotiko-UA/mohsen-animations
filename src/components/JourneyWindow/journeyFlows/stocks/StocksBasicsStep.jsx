import styles from '../../../JourneyCustomSteps.module.css'

export default function StocksBasicsStep({ next, openLink, goTo }) {
	return (
		<div className={styles.windowContent}>
			<div className={styles.hero}>
				<h3 className={styles.title}>WOW Education System: Stocks Basics</h3>
				<p className={styles.description}>
					Тут може бути абсолютно своя верстка: картинка, блоки, колонки,
					бейджі, що завгодно.
				</p>
			</div>

			<div className={styles.cardRow}>
				<div className={styles.card}>Custom block 1</div>
				<div className={styles.card}>Custom block 2</div>
			</div>

			<div className={styles.actions}>
				<button
					type='button'
					className={styles.primaryBtn}
					onClick={() => openLink('https://example.com/stocks-basics')}>
					Take me there!
				</button>

				<button
					type='button'
					className={styles.secondaryBtn}
					onClick={() => next('stocks-advanced')}>
					Next step
				</button>

				<button
					type='button'
					className={styles.ghostBtn}
					onClick={() => goTo('stocks-launchpad')}>
					Back to launchpad
				</button>
			</div>
		</div>
	)
}
