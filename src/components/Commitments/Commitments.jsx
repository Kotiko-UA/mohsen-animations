import styles from './Commitments.module.css'

import CloseIcon from '../../assets/close-icon.svg?react'
import InfoIcon from '../../assets/info-icon.svg?react'
import CheckIcon from '../../assets/check.svg'
import { useEffect, useState } from 'react'
import {
	getStoredCommitments,
	JOURNEY_COMMITMENTS_UPDATED,
} from '../../utils/journeyCommitments'

const commitmentTypes = ['Crypto', 'Forex', 'Stocks']

const buildCommitments = () => {
	const storedCommitments = getStoredCommitments()

	return commitmentTypes.map(type => ({
		icon: CheckIcon,
		type,
		time: storedCommitments[type] ?? 0,
	}))
}

export default function Commitments({ hidden }) {
	const [isHidden, setIsHidden] = useState(hidden)
	const [commitments, setCommitments] = useState(buildCommitments)

	useEffect(() => {
		setIsHidden(hidden)
	}, [hidden])

	useEffect(() => {
		const syncCommitments = () => {
			setCommitments(buildCommitments())
		}

		syncCommitments()

		window.addEventListener('storage', syncCommitments)
		window.addEventListener(JOURNEY_COMMITMENTS_UPDATED, syncCommitments)

		return () => {
			window.removeEventListener('storage', syncCommitments)
			window.removeEventListener(JOURNEY_COMMITMENTS_UPDATED, syncCommitments)
		}
	}, [])

	const handleClose = () => {
		setIsHidden(!isHidden)
	}

	return (
		<div className={`${styles.wrapper} ${hidden ? styles.hidden : ''}`}>
			<div className={styles.itemText}>Your commitments:</div>
			<button
				type='button'
				className={styles.closeByButton}
				onClick={handleClose}>
				{!isHidden && <CloseIcon className={styles.close} />}
				{isHidden && <InfoIcon className={styles.close} />}
			</button>
			{!isHidden && (
				<div className={styles.comWrapper}>
					{commitments.map(({ icon, type, time }) => (
						<div
							className={`${styles.item} ${!time ? styles.noTime : ''}`}
							key={type}>
							<img className={styles.icon} src={icon} alt='decorative icon' />
							<div className={styles.itemText}>
								{type} - <span>{time}</span> Minutes a day
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
