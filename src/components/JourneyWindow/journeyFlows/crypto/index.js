import { launchpadSteps } from './launchpad'
import { basicsSteps } from './basics'
import { productMasterySteps } from './productMastery'
import { intermediateSteps } from './intermediate'
import { advancedSteps } from './advanced'

export const cryptoFlow = {
	initialStepId: 'crypto-launchpad-main',
	steps: {
		...launchpadSteps,
		...basicsSteps,
		...productMasterySteps,
		...intermediateSteps,
		...advancedSteps,
	},
}
