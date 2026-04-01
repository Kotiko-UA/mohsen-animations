// import StocksBasicsImg from '../assets/stocks-basics.png'
// import StocksIntermediateImg from '../assets/stocks-intermediate.png'
// import StocksAdvancedImg from '../assets/stocks-advanced.png'

export const journeyFlows = {
	stocks: {
		initialStepId: 'stocks-launchpad',
		steps: {
			'stocks-launchpad': {
				title: 'Launchpad',
				description: 'Choose one:',
				meta: {
					sceneNode: 'stocks',
					roadStep: 1,
				},
				actions: [
					{
						id: 'stocks-broker',
						type: 'next',
						label: 'Broker',
						nextStepId: 'stocks-basics',
						variant: 'secondary',
					},
					{
						id: 'stocks-discover',
						type: 'next',
						label: 'Discover',
						nextStepId: 'stocks-intermediate',
						variant: 'secondary',
					},
				],
			},

			'stocks-basics': {
				title: 'WOW Education System: Stocks Basics',
				description:
					'We break down the core concepts in a simple way so even a complete beginner can begin to better understand the markets.',
				// media: {
				// 	src: StocksBasicsImg,
				// 	alt: 'Stocks basics',
				// },
				meta: {
					sceneNode: 'stocks',
					roadStep: 2,
				},
				actions: [
					{
						id: 'stocks-basics-link',
						type: 'link',
						label: 'Take me there!',
						href: 'https://example.com/stocks-basics',
					},
					{
						id: 'stocks-basics-next',
						type: 'next',
						label: 'Next step',
						nextStepId: 'stocks-advanced',
						variant: 'secondary',
					},
				],
			},

			'stocks-intermediate': {
				title: 'WOW Education System: Stocks Intermediate',
				description:
					'Intermediate level introduces more nuanced stock analysis techniques and real market structure.',
				// media: {
				// 	src: StocksIntermediateImg,
				// 	alt: 'Stocks intermediate',
				// },
				meta: {
					sceneNode: 'stocks',
					roadStep: 3,
				},
				actions: [
					{
						id: 'stocks-intermediate-learning',
						type: 'link',
						label: 'Learning Path',
						href: 'https://example.com/stocks-intermediate-learning',
					},
					{
						id: 'stocks-intermediate-live',
						type: 'link',
						label: 'Live Sessions',
						href: 'https://example.com/stocks-intermediate-live',
						variant: 'secondary',
					},
				],
			},

			'stocks-advanced': {
				title: 'WOW Education System: Stocks Advanced',
				description:
					'Advanced level helps refine evaluation, decision-making, and live market execution.',
				// media: {
				// 	src: StocksAdvancedImg,
				// 	alt: 'Stocks advanced',
				// },
				meta: {
					sceneNode: 'stocks',
					roadStep: 4,
				},
				actions: [
					{
						id: 'stocks-advanced-learning',
						type: 'link',
						label: 'Learning Path',
						href: 'https://example.com/stocks-advanced-learning',
					},
					{
						id: 'stocks-advanced-live',
						type: 'link',
						label: 'Live Sessions',
						href: 'https://example.com/stocks-advanced-live',
						variant: 'secondary',
					},
				],
			},
		},
	},

	forex: {
		initialStepId: 'forex-journey',
		steps: {
			'forex-journey': {
				title: 'Forex Journey',
				description:
					'Embark on your forex journey. Choose your commitment level to continue.',
				caption: 'Your commitment for 6 months may vary by intensity',
				meta: {
					sceneNode: 'forex',
					roadStep: 1,
				},
				actions: [
					{
						id: 'forex-20',
						type: 'next',
						label: '20 min/day',
						nextStepId: 'forex-launchpad',
						variant: 'secondary',
					},
					{
						id: 'forex-30',
						type: 'next',
						label: '30 min/day',
						nextStepId: 'forex-launchpad',
						variant: 'secondary',
					},
					{
						id: 'forex-60',
						type: 'next',
						label: '60 min/day',
						nextStepId: 'forex-launchpad',
						variant: 'secondary',
					},
				],
			},

			'forex-launchpad': {
				title: 'Launchpad',
				description: 'Choose one:',
				meta: {
					sceneNode: 'forex',
					roadStep: 2,
				},
				actions: [
					{
						id: 'forex-broker',
						type: 'link',
						label: 'Broker',
						href: 'https://example.com/forex-broker',
						variant: 'secondary',
					},
					{
						id: 'forex-discover',
						type: 'link',
						label: 'Discover',
						href: 'https://example.com/forex-discover',
						variant: 'secondary',
					},
				],
			},
		},
	},

	crypto: {
		initialStepId: 'crypto-start',
		steps: {
			'crypto-start': {
				title: 'Crypto Journey',
				description: 'Choose how you want to continue.',
				meta: {
					sceneNode: 'crypto',
					roadStep: 1,
				},
				actions: [
					{
						id: 'crypto-learn',
						type: 'next',
						label: 'Learning Path',
						nextStepId: 'crypto-learn-step',
					},
				],
			},
			'crypto-learn-step': {
				title: 'Crypto Learning',
				description: 'Basic crypto step screen.',
				meta: {
					sceneNode: 'crypto',
					roadStep: 2,
				},
				actions: [
					{
						id: 'crypto-open',
						type: 'link',
						label: 'Open path',
						href: 'https://example.com/crypto',
					},
				],
			},
		},
	},
}
