import './FinancialLiteracyModal.css'
import ArrowBack from '../../assets/arrow-purple.svg?react'
import CourseImg from '../../assets/fin-lit-img.jpg'

export default function FinancialLiteracyModal({ onClose }) {
	return (
		<div className='fl-modal-wrap' role='dialog' aria-modal='true'>
			<div className='fl-modal-backdrop' onClick={onClose} />
			<div className='fl-modal-card'>
				<button
					type='button'
					className='fl-modal-back'
					onClick={onClose}
					aria-label='Back'>
					<ArrowBack />
				</button>
				<div className='fl-modal-body'>
					<h2 className='fl-modal-title'>Financial Literacy</h2>
					<p className='fl-modal-desc'>
						Most people earn, spend, and hope for the best, never learning how
						money actually works. Knowing how to budget, save, and manage debt
						isn't reserved for finance professionals. It's a foundation everyone
						needs. Without these basics, even good investment opportunities
						become risks. Trading without a budget, an emergency fund, or an
						understanding of debt can leave you worse off than when you started.
						That's why this course comes first. Before you place a single trade,
						you need to know exactly where your money stands, what you can
						afford to risk, what you need to protect, and how to make decisions
						that serve your long-term well-being. This course will give you that
						clarity. Complete this course before moving on to trading. It's not
						a formality, it's the difference between building wealth and losing
						it.
					</p>
					<img
						className='fl-modal-img'
						src={CourseImg}
						alt='Financial Literacy'
					/>
					<div className='fl-modal-actions'>
						<a
							rel='noopener noreferrer nofollow'
							href='https://wowpowers.com/it/catalog/paths/484d128f-c7ae-4940-bb77-aeb98a765321'
							className='journey-modal-main-button'>
							Learning Path
						</a>
						<a
							rel='noopener noreferrer nofollow'
							href='https://wowpowers.com/it/stream-player/manuela_donghi/livestream/40646138-c168-4fb0-8cdd-67854eaef540'
							className='journey-modal-assent-button'>
							Live Sessions
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
