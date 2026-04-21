import { JourneyLinkButton, JourneyPrevButton } from '../../JourneyStepControls'
import Img from '../../../../assets/poster.jpg'
export default function ForexAdvanced2() {
	return (
		<div className='journey-modal-wrap'>
			<div className='flex-col-12'>
				<JourneyPrevButton />
				<h2 className='text-h-32-700'>
					WES Forex Advanced: Select Your Strategy
				</h2>
			</div>
			<div className='journey-modal-dis-sw'>
				<div className='f-a-play-wrap'>
					<video className='f-a-play-img' poster={Img} controls>
						<source
							src='https://customer-53h132zv3w4ijpjn.cloudflarestream.com/eecafc06038cd00f1fe5da2790e21ac2/manifest/video.m3u8'
							type='video/mp4'
						/>
					</video>
					<a
						target='_blank'
						noopener
						noopener
						nofollow
						href='https://wowpowers.com/stream-player/nate/livestream/1e033a9f-1338-4b08-b22d-2a8a3fa64b4f?reference=TOP_EDUCATORS'
						className='text-h-18-500 f-a-play-text'>
						Confluence Strategy
					</a>
				</div>
				<div className='f-a-play-wrap'>
					<video className='f-a-play-img' poster={Img} controls>
						<source
							src='https://customer-53h132zv3w4ijpjn.cloudflarestream.com/c6f38777da322567d9479e976c8acf4e/manifest/video.m3u8'
							type='video/mp4'
						/>
					</video>
					<a
						target='_blank'
						noopener
						noopener
						nofollow
						href='https://wowpowers.com/stream-player/reynaldo/livestream/cdbd577d-5132-41d9-a188-845afef4f31e'
						className='text-h-18-500 f-a-play-text'>
						Precision Strategy
					</a>
				</div>
				<div className='f-a-play-wrap'>
					<video className='f-a-play-img' poster={Img} controls>
						<source
							src='https://customer-53h132zv3w4ijpjn.cloudflarestream.com/d2c2c6e9b82fa824e789ec7fbe88488d/manifest/video.m3u8'
							type='video/mp4'
						/>
					</video>
					<a
						target='_blank'
						noopener
						noopener
						nofollow
						href='https://wowpowers.com/stream-player/giuliano/livestream/253eef6c-dff1-41cd-84aa-e32a1e6ac473'
						className='text-h-18-500 f-a-play-text'>
						Geometry Strategy
					</a>
				</div>
			</div>
			<div className='flex-col-24'>
				<JourneyLinkButton
					link={
						'https://wowpowers.com/catalog/paths/025efd7c-1c3c-4eb2-93e1-a618c2eacef8'
					}
					className='journey-modal-main-button'>
					Learning Path
				</JourneyLinkButton>
				{/* <JourneyLinkButton link={'#'} className='journey-modal-assent-button'>
					Live Sessions
				</JourneyLinkButton> */}
			</div>
		</div>
	)
}
