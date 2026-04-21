const STORAGE_KEY = 'journeyCommitments'
// Custom event name used to notify other components when commitments change without prop drilling
export const JOURNEY_COMMITMENTS_UPDATED = 'journey-commitments-updated'

export function getStoredCommitments() {
	// Guard for SSR environments where window/localStorage are unavailable
	if (typeof window === 'undefined') return {}

	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : {}
	} catch {
		// Handles cases where localStorage is blocked (private mode, storage quota exceeded)
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

	// Dispatch so Commitments component and any listeners update without needing a shared state store
	window.dispatchEvent(
		new CustomEvent(JOURNEY_COMMITMENTS_UPDATED, {
			detail: nextCommitments,
		}),
	)
}
