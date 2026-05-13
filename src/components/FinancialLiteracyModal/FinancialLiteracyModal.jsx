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
						In this course, you will develop one of the most valuable yet
						overlooked life skills available to you. You will learn how to
						budget, save, invest, and manage debt — giving you the tools to
						make informed financial decisions that shape your long-term
						well-being. By the end of this course, you&apos;ll be equipped to
						navigate rising costs, complex financial products, and the everyday
						money challenges that affect nearly every aspect of life.
						Understanding and managing your finances isn&apos;t just a personal
						advantage — it&apos;s a necessity, and this course will show you
						how.
					</p>
					<img
						className='fl-modal-img'
						src={CourseImg}
						alt='Financial Literacy'
					/>
					<div className='fl-modal-actions'>
						<a
							rel='noopener noreferrer nofollow'
							href='#'
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
