const STORAGE_KEY = 'journeyCommitments'
export const JOURNEY_COMMITMENTS_UPDATED = 'journey-commitments-updated'

export function getStoredCommitments() {
	if (typeof window === 'undefined') return {}

	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : {}
	} catch {
		return {}
	}
}

export function getCommitmentMinutes(journeyType) {
	const commitments = getStoredCommitments()
	return commitments[journeyType] ?? 0
}

export function saveCommitment(journeyType, minutes) {
	if (typeof window === 'undefined') return

	const nextCommitments = {
		...getStoredCommitments(),
		[journeyType]: minutes,
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCommitments))

	window.dispatchEvent(
		new CustomEvent(JOURNEY_COMMITMENTS_UPDATED, {
			detail: nextCommitments,
		}),
	)
}
