import './FinancialLiteracy.css'
import Arrow from '../../assets/arrow-up-right.svg?react'
import Img1 from '../../assets/fl-img-1.avif'
import Img2 from '../../assets/fl-img-2.avif'
import Img3 from '../../assets/fl-img-3.avif'
const FinancialLiteracy = ({ onClick }) => {
	return (
		<button className='fin-lit-button' onClick={onClick}>
			<Arrow className='journey-mobile-cta-lock' />
			Financial Literacy
			<div className='fin-lit-imgs'>
				<img
					className='fin-lit-img fin-lit-img--1'
					src={Img1}
					alt='decorative'
				/>
				<img
					className='fin-lit-img fin-lit-img--2'
					src={Img2}
					alt='decorative'
				/>
				<img
					className='fin-lit-img fin-lit-img--3'
					src={Img3}
					alt='decorative'
				/>
			</div>
		</button>
	)
}

export default FinancialLiteracy
