import { useEffect, useMemo, useState } from 'react'
import styles from './Timer.module.css'
import TimerIcon from '../../assets/timer.svg?react'
import TimerDot from '../../assets/timer-dot.avif'

function parseDateString(dateString) {
	const [day, month, year] = dateString.split('.').map(Number)

	if (!day || !month || !year) return null

	return new Date(year, month - 1, day, 0, 0, 0)
}

function getTimeLeft(targetDate) {
	const now = new Date()
	const diff = targetDate.getTime() - now.getTime()

	if (diff <= 0) {
		return {
			total: 0,
			days: '00',
			hours: '00',
			minutes: '00',
		}
	}

	const totalSeconds = Math.floor(diff / 1000)
	const days = Math.floor(totalSeconds / (24 * 60 * 60))
	const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)

	return {
		total: diff,
		days: String(days).padStart(2, '0'),
		hours: String(hours).padStart(2, '0'),
		minutes: String(minutes).padStart(2, '0'),
	}
}

export default function Timer({ targetDate = '24.04.2026', hidden }) {
	const parsedTargetDate = useMemo(
		() => parseDateString(targetDate),
		[targetDate],
	)

	const [timeLeft, setTimeLeft] = useState(() => {
		if (!parsedTargetDate) {
			return { days: '00', hours: '00', minutes: '00', total: 0 }
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
		<div className={`${styles.wrapper} ${hidden ? styles.hidden : ''}`}>
			<div className={styles.timerWrapper}>
				<div className={styles.timerPill}>
					<div className={styles.timerItem}>
						<div className={styles.timerValue}>{timeLeft.days}</div>
						<div className={styles.timerLabel}>days</div>
					</div>
					<div className={styles.timerSeparator}>:</div>
					<div className={styles.timerItem}>
						<div className={styles.timerValue}>{timeLeft.hours} </div>
						<div className={styles.timerLabel}>hours</div>
					</div>

					<div className={styles.timerSeparator}>:</div>

					<div className={styles.timerItem}>
						<div className={styles.timerValue}>{timeLeft.minutes}</div>
						<div className={styles.timerLabel}>min</div>
					</div>
				</div>
			</div>
			<img src={TimerDot} alt='timer dot' className={styles.timerDot} />
			<div className={styles.timeText}>
				<div className={styles.textHeader}>Wes League</div>
				<div className={styles.textParagraph}>
					Wes Leagues is the start set 24 of April , midnight (25)
				</div>
			</div>
		</div>
	)
}
