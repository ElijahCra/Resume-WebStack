'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

const Banner: React.FC = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const bannerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setIsScrolled(scrollPosition > 5)
        }

        const updateHeight = () => {
            if (bannerRef.current) {
                document.documentElement.style.setProperty('--banner-height', `${bannerRef.current.offsetHeight}px`)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', updateHeight)

        // Initial height update
        updateHeight()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    useEffect(() => {
        if (bannerRef.current) {
            document.documentElement.style.setProperty('--banner-height', `${bannerRef.current.offsetHeight}px`)
        }
    }, [isScrolled])

    return (
        <header
            ref={bannerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-slate-3 py-2' : 'bg-slate-3 py-6'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className={`flex justify-between items-center transition-all duration-300 ${
                    isScrolled ? 'text-sm' : 'text-base'
                }`}>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-white hover:text-accent-11 transition-colors">
                            Home
                        </Link>
                        <Link href="/posts" className="text-white hover:text-accent-11 transition-colors">
                            Posts
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Banner