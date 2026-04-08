import CryptoStartStep from './journey-steps/crypto/CryptoStartStep'
import HowMuchTimeCrypto from './journey-steps/crypto/HowMuchTime'
import CryptoLaunchpadStep1 from './journey-steps/crypto/CryptoLaunchpadStep1'
import CryptoLaunchpadOnboarding from './journey-steps/crypto/CryptoLaunchpadOnboarding'
import CryptoLaunchpadBroker1 from './journey-steps/crypto/CryptoLaunchpadBroker1'
import CryptoLaunchpadBroker2 from './journey-steps/crypto/CryptoLaunchpadBroker2'
import CryptoLaunchpadDiscord from './journey-steps/crypto/CryptoLaunchpadDiscord'
import CryptoOnboardingStep1 from './journey-steps/crypto/CryptoOnboardingStep1'
import CryptoOnboardingStep2 from './journey-steps/crypto/CryptoOnboardingStep2'
import CryptoExchangeDiscoveryStep1 from './journey-steps/crypto/CryptoExchangeDiscoveryStep1'
import StocksIntroStep1 from './journey-steps/stocks/StocksIntroStep1'
import ForexStartStep from './journey-steps/forex/ForexStartStep'
import StocksStartStep from './journey-steps/stocks/StocksStartStep'
import HowMuchTimeForex from './journey-steps/forex/HowMuchTime'
import HowMuchTimeStocks from './journey-steps/stocks/HowMuchTime'

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
						component: CryptoStartStep,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-2',
						component: HowMuchTimeCrypto,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-3',
						component: CryptoLaunchpadStep1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-4',
						component: CryptoLaunchpadOnboarding,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-5',
						component: CryptoLaunchpadBroker1,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-6',
						component: CryptoLaunchpadBroker2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 1,
						},
					},
					{
						id: 'crypto-point-1-step-7',
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
					{
						id: 'crypto-point-2-step-2',
						component: CryptoOnboardingStep2,
						meta: {
							sceneNode: 'crypto',
							roadStep: 2,
						},
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
						component: ForexStartStep,
						meta: {
							sceneNode: 'forex',
							roadStep: 1,
						},
					},
					{
						id: 'forex-point-1-step-2',
						component: HowMuchTimeForex,
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
