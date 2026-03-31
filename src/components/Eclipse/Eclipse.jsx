import EclipseGIF from '../../assets/eclipse.gif'
import EclipseBlur from '../../assets/eclipse-blur-5.avif'
import EclipseLock from '../../assets/eclipse-blur-lock.avif'

import ArrowIcon from '../../assets/arrow-up-right.svg?react'
import LockIcon from '../../assets/lock.svg?react'
import styles from './Eclipse.module.css'

const MessageCard = ({ text, className, type }) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			{type === 'locked' && (
				<div className={styles.comingSoon}>Coming Soon!</div>
			)}
			{type === 'locked' ? (
				<img
					className={styles.imageEclipse}
					src={EclipseLock}
					alt='decoration'
				/>
			) : (
				<img
					className={styles.imageEclipse}
					src={EclipseBlur}
					alt='decoration'
				/>
			)}
			{type === 'locked' && <div className={styles.blur}></div>}
			<img className={styles.image} src={EclipseGIF} alt='decoration' />

			<div className={styles.textWrapper}>
				<ArrowIcon className={styles.icon} />
				<div className={styles.text}>{text}</div>
			</div>
			{type === 'locked' && (
				<div className={styles.lockedIcon}>
					<LockIcon className={styles.lockedSVG} />
				</div>
			)}
		</div>
	)
}

export default MessageCard
