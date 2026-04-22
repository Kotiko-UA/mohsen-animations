import {
	JourneyLinkButton,
	JourneyMobileBackToPointsButton,
} from '../../JourneyStepControls'
import Img from '../../../../assets/stock-basic-img-1.jpg'

export default function StockBasic() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyMobileBackToPointsButton />
				<h2 className='text-h-32-700'>WOW Education System: Stocks Basics</h2>
			</div>
			<div className='journey-modal-text'>
				<span>Wow Education System (WES) Stock Market Program</span> guides you
				step by step into the world of equity investing and stock market
				trading. The journey begins with the <span>Basic Level</span>, where you
				learn essential concepts such as how stock markets operate, types of
				stocks, exchanges, order types, and fundamental risk management through
				short, interactive, and easy-to-follow modules.
			</div>
			<img src={Img} alt='decor' className='cpms-2-img' />
			<JourneyLinkButton
				link={
					'https://wowpowers.com/catalog/paths/726a87f3-ae23-4527-a4c3-17620c5ff2c5'
				}
				className='journey-modal-main-button'>
				Take me there!
			</JourneyLinkButton>
		</div>
	)
}
