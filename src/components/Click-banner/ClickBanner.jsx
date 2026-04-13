import styles from './ClickBanner.module.css'
import LogoIcon from '../../assets/wes-logo.svg?react'
import ClickIcon from '../../assets/click-hand.svg?react'

const ClickBanner = ({ hidden }) => {
	return (
		<div className={`${styles.wrapper} ${hidden ? styles.hidden : ''}`}>
			<div className={styles.logoWrap}>
				<LogoIcon className={styles.logoIcon} />
				<div className={styles.logoText}>Wes Customer Journey</div>
			</div>

			<div className={styles.textWrap}>
				<div className={styles.text}>Click a road to choose your market</div>
				<ClickIcon className={styles.textIcon} />
			</div>
		</div>
	)
}

export default ClickBanner
