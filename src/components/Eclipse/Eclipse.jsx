import EclipseGIF from '../../assets/eclipse.gif'
import EclipseBlur from '../../assets/eclipse-blur-5.avif'

import ArrowIcon from '../../assets/arrow-up-right.svg?react'
import styles from './Eclipse.module.css'

const MessageCard = ({ text, className }) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<img className={styles.imageEclipse} src={EclipseBlur} alt='decoration' />

			<img className={styles.image} src={EclipseGIF} alt='decoration' />

			<div className={styles.textWrapper}>
				<ArrowIcon className={styles.icon} />
				<div className={styles.text}>{text}</div>
			</div>
		</div>
	)
}

export default MessageCard
