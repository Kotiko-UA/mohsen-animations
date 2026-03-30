import EclipseGIF from '../../assets/eclipse.gif'
import EclipseBlur from '../../assets/eclipse-blur-4.avif'
import EclipseGradient from '../../assets/eclipse-gradient.avif'
import ArrowIcon from '../../assets/arrow-up-right.svg?react'
import styles from './Eclipse.module.css'

const MessageCard = ({ text, type }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.imageTopWrapper}>
				<img
					className={styles.imageEclipse}
					src={EclipseBlur}
					alt='decoration'
				/>
				<div className={styles.eclipseGIF}>
					<div className={styles.imageWrap}>
						<img
							className={styles.imageEclipseGradient}
							src={EclipseGradient}
							alt='decoration'
						/>
						<img className={styles.image} src={EclipseGIF} alt='decoration' />
					</div>
				</div>
			</div>

			<div className={styles.textWrapper}>
				<ArrowIcon className={styles.icon} />
				<div className={styles.text}>{text}</div>
			</div>
		</div>
	)
}

export default MessageCard
