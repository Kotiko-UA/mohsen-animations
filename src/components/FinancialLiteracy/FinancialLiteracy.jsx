import './FinancialLiteracy.css'
import Lock from '../../assets/lock.svg?react'
const FinancialLiteracy = () => {
	return (
		<button className='journey-modal-main-button fin-lit-button'>
			<Lock className='journey-mobile-cta-lock' />
			Financial Literacy
			<span className='journey-mobile-coming-soon fin-lit-coming'>
				Coming soon!
			</span>
		</button>
	)
}

export default FinancialLiteracy
