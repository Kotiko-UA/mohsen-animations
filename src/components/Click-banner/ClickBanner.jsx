import styles from './ClickBanner.module.css'
import LogoIcon from '../../assets/wes-logo.svg?react'
import ClickIcon from '../../assets/click-hand.svg?react'

const ClickBanner = ({ hidden }) => {
	return (
		<div className={`${styles.wrapper} ${hidden ? styles.hidden : ''}`}>
			<div className={styles.logoWrap}>
				<LogoIcon />
				<div className={styles.text}>Wes Customer Journey</div>
			</div>
			<div className={styles.textWrap}>
				<div>Сlick a road to choose your market</div>
				<ClickIcon />
			</div>
		</div>
	)
}
export default ClickBanner
