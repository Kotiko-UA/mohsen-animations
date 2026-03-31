import styles from './Commitments.module.css'

import CloseIcon from '../../assets/close-icon.svg?react'
import CheckIcon from '../../assets/check.svg'
import { useEffect, useState } from 'react'

const commitments = [
	{
		icon: CheckIcon,
		type: 'Stocks',
		time: 120,
	},
	{
		icon: CheckIcon,
		type: 'Forex',
		time: 30,
	},
	{
		icon: CheckIcon,
		type: 'Crypto',
		time: 0,
	},
]

export default function Commitments({ hidden }) {
	const [isHidden, setIsHidden] = useState(false)

	useEffect(() => {
		setIsHidden(hidden)
	}, [hidden])

	const handleClose = () => {
		setIsHidden(true)
	}

	return (
		!isHidden && (
			<div className={`${styles.wrapper} ${hidden ? styles.hidden : ''}`}>
				<div className={styles.itemText}>Your commitments:</div>

				<button
					type='button'
					className={styles.closeByButton}
					onClick={handleClose}>
					<CloseIcon className={styles.close} />
				</button>

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
			</div>
		)
	)
}
