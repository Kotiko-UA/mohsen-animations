import CryptoStartStep from './journey-steps/crypto/CryptoStartStep'
import HowMuchTimeCrypto from './journey-steps/crypto/HowMuchTime'
import CryptoLaunchpadStep1 from './journey-steps/crypto/CryptoLaunchpadStep1'
import CryptoLaunchpadOnboarding from './journey-steps/crypto/CryptoLaunchpadOnboarding'
import CryptoLaunchpadBroker1 from './journey-steps/crypto/CryptoLaunchpadBroker1'
import CryptoLaunchpadBroker2 from './journey-steps/crypto/CryptoLaunchpadBroker2'
import CryptoLaunchpadDiscord from './journey-steps/crypto/CryptoLaunchpadDiscord'
import CryptoOnboardingStep1 from './journey-steps/crypto/CryptoOnboardingStep1'
import CryptoProductMasteryStep1 from './journey-steps/crypto/CryptoProductMasteryStep1'
import CryptoProductMasteryStep2 from './journey-steps/crypto/CryptoProductMasteryStep2'
import CryptoProductMasteryStep3 from './journey-steps/crypto/CryptoProductMasteryStep3'
import CryptoIntermediate from './journey-steps/crypto/CryptoIntermediate'
import CryptoAdvanced from './journey-steps/crypto/CryptoAdvanced'

import StocksIntroStep1 from './journey-steps/stocks/StocksIntroStep1'
import ForexStartStep from './journey-steps/forex/ForexStartStep'
import StocksStartStep from './journey-steps/stocks/StocksStartStep'
import HowMuchTimeForex from './journey-steps/forex/HowMuchTime'
import HowMuchTimeStocks from './journey-steps/stocks/HowMuchTime'

export const JOURNEYS = {
	crypto: {
		id: 'crypto',
		title: 'Crypto',
		introSteps: [
			{
				id: 'crypto-intro-step-1',
				component: CryptoStartStep,
			},
			{
				id: 'crypto-intro-step-2',
				component: HowMuchTimeCrypto,
			},
		],
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
					},
					{
						id: 'crypto-point-1-step-2',
						component: CryptoLaunchpadOnboarding,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-3',
						component: CryptoLaunchpadBroker1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-4',
						component: CryptoLaunchpadBroker2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-5',
						component: CryptoLaunchpadDiscord,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
				],
			},
			{
				id: 'crypto-point-2',
				title: 'WES Crypto Basics',
				steps: [
					{
						id: 'crypto-point-2-step-1',
						component: CryptoOnboardingStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
					},
				],
			},
			{
				id: 'crypto-point-3',
				title: 'Product Mastery',
				steps: [
					{
						id: 'crypto-point-3-step-1',
						component: CryptoProductMasteryStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 3,
						},
					},
					{
						id: 'crypto-point-3-step-2',
						component: CryptoProductMasteryStep2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 3,
						},
					},
					{
						id: 'crypto-point-3-step-3',
						component: CryptoProductMasteryStep3,
						meta: {
							sceneNode: 'crypto',
							roadStep: 3,
						},
					},
				],
			},
			{
				id: 'crypto-point-4',
				title: 'WES Crypto Intermediate',
				steps: [
					{
						id: 'crypto-point-4-step-1',
						component: CryptoIntermediate,
						meta: {
							sceneNode: 'crypto',
							roadStep: 4,
						},
					},
				],
			},
			{
				id: 'crypto-point-5',
				title: 'WES Crypto Advanced',
				steps: [
					{
						id: 'crypto-point-4-step-1',
						component: CryptoAdvanced,
						meta: {
							sceneNode: 'crypto',
							roadStep: 4,
						},
					},
				],
			},
		],
	},

	forex: {
		id: 'forex',
		title: 'Forex',
		introSteps: [
			{
				id: 'forex-intro-step-1',
				component: ForexStartStep,
			},
			{
				id: 'forex-intro-step-2',
				component: HowMuchTimeForex,
			},
		],
		points: [
			{
				id: 'forex-point-1',
				title: 'Launchpad',
				steps: [
					{
						id: 'forex-point-1-step-1',
						component: CryptoLaunchpadStep1,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-2',
						component: CryptoLaunchpadOnboarding,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-3',
						component: CryptoLaunchpadBroker1,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-4',
						component: CryptoLaunchpadBroker2,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-5',
						component: CryptoLaunchpadDiscord,
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
						component: StocksStartStep,
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
					},
					{
						id: 'stocks-point-1-step-2',
						component: HowMuchTimeStocks,
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
