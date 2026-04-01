import styles from './JourneyCustomSteps.module.css'

export const journeyFlows = {
	stocks: {
		initialStepId: 'stocks-launchpad',
		steps: {
			'stocks-launchpad': {
				meta: {
					sceneNode: 'stocks',
					roadStep: 1,
				},
				render: ({ next }) => (
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
				),
			},

			'stocks-basics': {
				meta: {
					sceneNode: 'stocks',
					roadStep: 2,
				},
				render: ({ next, openLink, goTo }) => (
					<div className={styles.windowContent}>
						<div className={styles.hero}>
							<h3 className={styles.title}>
								WOW Education System: Stocks Basics
							</h3>
							<p className={styles.description}>
								Тут може бути абсолютно своя верстка: іконки, картинка, кілька
								колонок, бейджі, блоки, що завгодно.
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
				),
			},

			'stocks-intermediate': {
				meta: {
					sceneNode: 'stocks',
					roadStep: 3,
				},
				render: ({ openLink }) => (
					<div className={styles.windowContent}>
						<h3 className={styles.title}>Stocks Intermediate</h3>

						<div className={styles.customLayout}>
							<div className={styles.left}>
								<p>Тут своя ліва колонка</p>
							</div>
							<div className={styles.right}>
								<p>Тут своя права колонка</p>
							</div>
						</div>

						<div className={styles.actions}>
							<button
								type='button'
								className={styles.primaryBtn}
								onClick={() =>
									openLink('https://example.com/stocks-intermediate-learning')
								}>
								Learning Path
							</button>

							<button
								type='button'
								className={styles.secondaryBtn}
								onClick={() =>
									openLink('https://example.com/stocks-intermediate-live')
								}>
								Live Sessions
							</button>
						</div>
					</div>
				),
			},

			'stocks-advanced': {
				meta: {
					sceneNode: 'stocks',
					roadStep: 4,
				},
				render: ({ openLink }) => (
					<div className={styles.windowContent}>
						<h3 className={styles.title}>Stocks Advanced</h3>
						<p>Будь-який контент.</p>

						<button
							type='button'
							className={styles.primaryBtn}
							onClick={() =>
								openLink('https://example.com/stocks-advanced-learning')
							}>
							Learning Path
						</button>
					</div>
				),
			},
		},
	},
}
