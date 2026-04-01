import CryptoProductMasteryMainStep from './CryptoProductMasteryMainStep'
import CryptoProductMasteryStep from './CryptoProductMasteryStep'
import CryptoToolboxEducationStep from './CryptoToolboxEducationStep'

export const productMasterySteps = {
	'crypto-product-mastery-main': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 3,
			pointKey: 'product-mastery',
		},
		component: CryptoProductMasteryMainStep,
	},

	'crypto-product-mastery-product': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 3,
			pointKey: 'product-mastery',
		},
		component: CryptoProductMasteryStep,
	},

	'crypto-product-mastery-toolbox': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 3,
			pointKey: 'product-mastery',
		},
		component: CryptoToolboxEducationStep,
	},
}
