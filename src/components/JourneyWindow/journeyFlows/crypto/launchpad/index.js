import CryptoLaunchpadMainStep from './CryptoLaunchpadMainStep'
import CryptoOnboardingStep from './CryptoOnboardingStep'
import CryptoExchangeDiscoveryStep from './CryptoExchangeDiscoveryStep'
import CryptoBrokerConfirmStep from './CryptoBrokerConfirmStep'
import CryptoDiscordStep from './CryptoDiscordStep'

export const launchpadSteps = {
	'crypto-launchpad-main': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 1,
			pointKey: 'launchpad',
		},
		component: CryptoLaunchpadMainStep,
	},

	'crypto-launchpad-onboarding': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 1,
			pointKey: 'launchpad',
		},
		component: CryptoOnboardingStep,
	},

	'crypto-launchpad-broker': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 1,
			pointKey: 'launchpad',
		},
		component: CryptoExchangeDiscoveryStep,
	},

	'crypto-launchpad-broker-confirm': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 1,
			pointKey: 'launchpad',
		},
		component: CryptoBrokerConfirmStep,
	},

	'crypto-launchpad-discord': {
		meta: {
			sceneNode: 'crypto',
			roadStep: 1,
			pointKey: 'launchpad',
		},
		component: CryptoDiscordStep,
	},
}
