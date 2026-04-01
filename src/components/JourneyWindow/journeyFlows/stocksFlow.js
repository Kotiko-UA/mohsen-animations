import StocksLaunchpadStep from './stocks/StocksLaunchpadStep'
import StocksBasicsStep from './stocks/StocksBasicsStep'
// import StocksIntermediateStep from './steps/stocks/StocksIntermediateStep'
// import StocksAdvancedStep from './steps/stocks/StocksAdvancedStep'

export const stocksFlow = {
	initialStepId: 'stocks-launchpad',
	steps: {
		'stocks-launchpad': {
			meta: {
				sceneNode: 'stocks',
				roadStep: 1,
			},
			component: StocksLaunchpadStep,
		},
		'stocks-basics': {
			meta: {
				sceneNode: 'stocks',
				roadStep: 2,
			},
			component: StocksBasicsStep,
		},
		// 'stocks-intermediate': {
		// 	meta: {
		// 		sceneNode: 'stocks',
		// 		roadStep: 3,
		// 	},
		// 	component: StocksIntermediateStep,
		// },
		// 'stocks-advanced': {
		// 	meta: {
		// 		sceneNode: 'stocks',
		// 		roadStep: 4,
		// 	},
		// 	component: StocksAdvancedStep,
		// },
	},
}
