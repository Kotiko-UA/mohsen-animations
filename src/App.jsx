import { useEffect, useState } from 'react'
import { Animation } from './animation/animation'
import { AnimationMob } from './animation/animation-mob'

import './App.css'

function App() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1279)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1279)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return <section>{isMobile ? <AnimationMob /> : <Animation />}</section>
}

export default App
