import { useEffect, useMemo, useState } from 'react'
import styles from './Timer.module.css'
import TimerIcon from '../../assets/timer.svg?react'

function parseDateString(dateString) {
	const [day, month, year] = dateString.split('.').map(Number)

	if (!day || !month || !year) return null

	// 01.05.2026 => 1 травня 2026, 00:00:00 за локальним часом
	return new Date(year, month - 1, day, 0, 0, 0)
}

function getTimeLeft(targetDate) {
	const now = new Date()
	const diff = targetDate.getTime() - now.getTime()

	if (diff <= 0) {
		return {
			total: 0,
			hours: '00',
			minutes: '00',
			seconds: '00',
		}
	}

	const totalSeconds = Math.floor(diff / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	return {
		total: diff,
		hours: String(hours).padStart(2, '0'),
		minutes: String(minutes).padStart(2, '0'),
		seconds: String(seconds).padStart(2, '0'),
	}
}

export default function Timer({ targetDate = '01.05.2026' }) {
	const parsedTargetDate = useMemo(
		() => parseDateString(targetDate),
		[targetDate],
	)

	const [timeLeft, setTimeLeft] = useState(() => {
		if (!parsedTargetDate) {
			return { hours: '00', minutes: '00', seconds: '00', total: 0 }
		}
		return getTimeLeft(parsedTargetDate)
	})

	useEffect(() => {
		if (!parsedTargetDate) return

		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft(parsedTargetDate))
		}, 1000)

		return () => clearInterval(interval)
	}, [parsedTargetDate])

	if (!parsedTargetDate) {
		return (
			<div className={styles.timerWrapper}>
				<TimerIcon className={styles.timerSVG} />
				<div className={styles.timerText}>Invalid date</div>
			</div>
		)
	}

	return (
		<div className={styles.timerWrapper}>
			<TimerIcon className={styles.timerSVG} />
			<div className={styles.timerText}>
				{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
			</div>
		</div>
	)
}
