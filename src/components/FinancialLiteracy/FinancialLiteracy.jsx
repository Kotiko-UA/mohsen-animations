import './FinancialLiteracy.css'
import Lock from '../../assets/lock.svg?react'
import Img1 from '../../assets/fl-img-1.avif'
import Img2 from '../../assets/fl-img-2.avif'
import Img3 from '../../assets/fl-img-3.avif'
const FinancialLiteracy = () => {
	return (
		<div className='fin-lit-button'>
			<Lock className='journey-mobile-cta-lock' />
			Financial Literacy
			<span className='journey-mobile-coming-soon fin-lit-coming'>
				Coming soon!
			</span>
			<div className='fin-lit-imgs'>
				<img className='fin-lit-img fin-lit-img--1' src={Img1} alt='decorative' />
				<img className='fin-lit-img fin-lit-img--2' src={Img2} alt='decorative' />
				<img className='fin-lit-img fin-lit-img--3' src={Img3} alt='decorative' />
			</div>
		</div>
	)
}

export default FinancialLiteracy
