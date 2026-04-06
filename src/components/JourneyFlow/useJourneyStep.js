import { useContext } from 'react'
import { JourneyStepContext } from './JourneyStepContext'

export const useJourneyStep = () => {
	const context = useContext(JourneyStepContext)

	if (!context) {
		throw new Error('useJourneyStep must be used inside JourneyStepProvider')
	}

	return context
}
