export const JOURNEYS = {
	crypto: {
		id: 'crypto',
		title: 'Crypto',
		points: [
			{
				id: 'crypto-point-1',
				title: 'Launchpad',
				steps: [
					{
						id: 'crypto-point-1-step-1',
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
						link: 'https://example.com/launchpad',
						linkLabel: 'Перейти за посиланням',
						content: (
							<div>
								<h3>Launchpad / Крок 1</h3>
								<p>Тут твоя власна верстка.</p>
							</div>
						),
					},
					{
						id: 'crypto-point-1-step-2',
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
						content: (
							<div>
								<h3>Launchpad / Крок 2</h3>
								<p>Тут може бути інший JSX, інша картка, інша розмітка.</p>
							</div>
						),
					},
				],
			},
			{
				id: 'crypto-point-2',
				title: 'Onboarding',
				steps: [
					{
						id: 'crypto-point-2-step-1',
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
						content: (
							<div>
								<h3>Onboarding / Крок 1</h3>
								<p>
									Друга точка. Вона буде закрита, поки не дійдеш до кінця
									першої.
								</p>
							</div>
						),
					},
					{
						id: 'crypto-point-2-step-2',
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
						link: 'https://example.com/onboarding',
						content: (
							<div>
								<h3>Onboarding / Крок 2</h3>
								<p>Тут теж можна зробити будь-яку власну картку.</p>
							</div>
						),
					},
				],
			},
			{
				id: 'crypto-point-3',
				title: 'Exchange Discovery',
				steps: [
					{
						id: 'crypto-point-3-step-1',
						meta: {
							sceneNode: 'crypto',
							roadStep: 3,
						},
						content: (
							<div>
								<h3>Exchange Discovery / Крок 1</h3>
								<p>Третя точка.</p>
							</div>
						),
					},
				],
			},
		],
	},

	forex: {
		id: 'forex',
		title: 'Forex',
		points: [
			{
				id: 'forex-point-1',
				title: 'Intro',
				steps: [
					{
						id: 'forex-point-1-step-1',
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
						content: <div>Forex / точка 1 / крок 1</div>,
					},
				],
			},
		],
	},

	stocks: {
		id: 'stocks',
		title: 'Stocks',
		points: [
			{
				id: 'stocks-point-1',
				title: 'Intro',
				steps: [
					{
						id: 'stocks-point-1-step-1',
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
						content: <div>Stocks / точка 1 / крок 1</div>,
					},
				],
			},
		],
	},
}
