import CryptoLaunchpadStep1 from './journey-steps/crypto/CryptoLaunchpadStep1'
import CryptoLaunchpadStep2 from './journey-steps/crypto/CryptoLaunchpadStep2'
import CryptoOnboardingStep1 from './journey-steps/crypto/CryptoOnboardingStep1'
import CryptoOnboardingStep2 from './journey-steps/crypto/CryptoOnboardingStep2'
import CryptoExchangeDiscoveryStep1 from './journey-steps/crypto/CryptoExchangeDiscoveryStep1'

import ForexIntroStep1 from './journey-steps/forex/ForexIntroStep1'
import StocksIntroStep1 from './journey-steps/stocks/StocksIntroStep1'

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
						component: CryptoLaunchpadStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
						link: 'https://example.com/launchpad',
						linkLabel: 'Перейти за посиланням',
					},
					{
						id: 'crypto-point-1-step-2',
						component: CryptoLaunchpadStep2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
				],
			},
			{
				id: 'crypto-point-2',
				title: 'Onboarding',
				steps: [
					{
						id: 'crypto-point-2-step-1',
						component: CryptoOnboardingStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
					},
					{
						id: 'crypto-point-2-step-2',
						component: CryptoOnboardingStep2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
						link: 'https://example.com/onboarding',
						linkLabel: 'Перейти за посиланням',
					},
				],
			},
			{
				id: 'crypto-point-3',
				title: 'Exchange Discovery',
				steps: [
					{
						id: 'crypto-point-3-step-1',
						component: CryptoExchangeDiscoveryStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 3,
						},
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
						component: ForexIntroStep1,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
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
						component: StocksIntroStep1,
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
					},
				],
			},
		],
	},
}
