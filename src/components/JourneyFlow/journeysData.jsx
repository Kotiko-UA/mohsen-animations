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

import ForexStartStep from './journey-steps/forex/ForexStartStep'
import HowMuchTimeForex from './journey-steps/forex/HowMuchTime'
import ForexBasic from './journey-steps/forex/ForexBasic'
import ForexLaunchpadBroker1 from './journey-steps/forex/ForexLaunchpadBroker1'
import ForexLaunchpadBroker2 from './journey-steps/forex/ForexLaunchpadBroker2'
import ForexLaunchpadDiscord from './journey-steps/forex/ForexLaunchpadDiscord'
import ForexProductMasteryStep1 from './journey-steps/forex/ForexProductMasteryStep1'
import ForexProductMasteryStep2 from './journey-steps/forex/ForexProductMasteryStep2'
import ForexProductMasteryStep3 from './journey-steps/forex/ForexProductMasteryStep3'
import ForexIntermediate from './journey-steps/forex/ForexIntermediate'
import ForexAdvanced from './journey-steps/forex/ForexAdvanced'
import ForexAdvanced2 from './journey-steps/forex/ForexAdvanced2'

import StocksStartStep from './journey-steps/stocks/StocksStartStep'
import HowMuchTimeStocks from './journey-steps/stocks/HowMuchTime'
import StocksLaunchpadStep1 from './journey-steps/stocks/StocksLaunchpadStep1'
import StocksLaunchpadBroker1 from './journey-steps/stocks/StocksLaunchpadBroker1'
import StocksLaunchpadBroker2 from './journey-steps/stocks/StocksLaunchpadBroker2'
import StocksLaunchpadDiscord from './journey-steps/stocks/StocksLaunchpadDiscord'

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
						component: ForexLaunchpadBroker1,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-4',
						component: ForexLaunchpadBroker2,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-5',
						component: ForexLaunchpadDiscord,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
				],
			},
			{
				id: 'forex-point-2',
				title: 'WES Forex Basics',
				steps: [
					{
						id: 'forex-point-2-step-1',
						component: ForexBasic,
						meta: {
							sceneNode: 'forex',
							roadStep: 2,
						},
					},
				],
			},
			{
				id: 'forex-point-3',
				title: 'Product Mastery',
				steps: [
					{
						id: 'forex-point-3-step-1',
						component: ForexProductMasteryStep1,
						meta: {
							sceneNode: 'forex',
							roadStep: 3,
						},
					},
					{
						id: 'forex-point-3-step-2',
						component: ForexProductMasteryStep2,
						meta: {
							sceneNode: 'forex',
							roadStep: 3,
						},
					},
					{
						id: 'forex-point-3-step-3',
						component: ForexProductMasteryStep3,
						meta: {
							sceneNode: 'forex',
							roadStep: 3,
						},
					},
					{
						id: 'forex-point-3-step-4',
						component: ForexIntermediate,
						meta: {
							sceneNode: 'forex',
							roadStep: 3,
						},
					},
				],
			},
			{
				id: 'forex-point-4',
				title: 'WES Forex Intermediate',
				steps: [
					{
						id: 'forex-point-4-step-1',
						component: ForexIntermediate,
						meta: {
							sceneNode: 'forex',
							roadStep: 4,
						},
					},
				],
			},
			{
				id: 'forex-point-5',
				title: 'WES Forex Advanced',
				steps: [
					{
						id: 'forex-point-5-step-1',
						component: ForexAdvanced,
						meta: {
							sceneNode: 'forex',
							roadStep: 5,
						},
					},
					{
						id: 'forex-point-5-step-2',
						component: ForexAdvanced2,
						meta: {
							sceneNode: 'forex',
							roadStep: 5,
						},
					},
				],
			},
		],
	},

	stocks: {
		id: 'stocks',
		title: 'Stocks',
		introSteps: [
			{
				id: 'stocks-intro-step-1',
				component: StocksStartStep,
			},
			{
				id: 'stocks-intro-step-2',
				component: HowMuchTimeStocks,
			},
		],
		points: [
			{
				id: 'stocks-point-1',
				title: 'Launchpad',
				steps: [
					{
						id: 'stocks-point-1-step-1',
						component: StocksLaunchpadStep1,
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
					},
					{
						id: 'stocks-point-1-step-2',
						component: StocksLaunchpadBroker1,
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
					},
					{
						id: 'stocks-point-1-step-3',
						component: StocksLaunchpadBroker2,
						meta: {
							sceneNode: 'stocks',
							roadStep: 1,
						},
					},
					{
						id: 'stocks-point-1-step-4',
						component: StocksLaunchpadDiscord,
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
