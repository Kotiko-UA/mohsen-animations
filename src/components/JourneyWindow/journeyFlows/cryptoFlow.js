import CryptoCommitmentStep from './steps/crypto/launchpad/CryptoCommitmentStep'
import CryptoLaunchpadStep from './steps/crypto/launchpad/CryptoLaunchpadStep'
import CryptoOnboardingStep from './steps/crypto/launchpad/CryptoOnboardingStep'
import CryptoExchangeDiscoveryStep from './steps/crypto/launchpad/CryptoExchangeDiscoveryStep'
import CryptoBrokerConfirmStep from './steps/crypto/launchpad/CryptoBrokerConfirmStep'
import CryptoDiscordStep from './steps/crypto/launchpad/CryptoDiscordStep'
import CryptoBasicsStep from './steps/crypto/basics/CryptoBasicsStep'

export const cryptoFlow = {
	initialStepId: 'crypto-commitment',
	steps: {
		'crypto-commitment': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 1,
			},
			component: CryptoCommitmentStep,
		},
		'crypto-launchpad': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 2,
			},
			component: CryptoLaunchpadStep,
		},
		'crypto-onboarding': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 3,
			},
			component: CryptoOnboardingStep,
		},
		'crypto-exchange-discovery': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 4,
			},
			component: CryptoExchangeDiscoveryStep,
		},
		'crypto-broker-confirm': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 5,
			},
			component: CryptoBrokerConfirmStep,
		},
		'crypto-discord': {
			meta: {
				sceneNode: 'crypto',
				roadStep: 6,
			},
			component: CryptoDiscordStep,
		},
	},
}
