import { useEffect, useState } from 'react'
import { Animation } from './animation/animation'
import { AnimationMob } from './animation/animation-mob'

import './App.css'

function App() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1279)

	useEffect(() => {
		let rafId = null

		const handleResize = () => {
			if (rafId) cancelAnimationFrame(rafId)
			rafId = requestAnimationFrame(() => {
				setIsMobile(window.innerWidth <= 1279)
			})
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (rafId) cancelAnimationFrame(rafId)
		}
	}, [])

	return <section>{isMobile ? <AnimationMob /> : <Animation />}</section>
}

export default App
