'use client'

import React, { useEffect, useState } from 'react'

interface TableOfContentsProps {
    headings: { id: string; text: string; level: number }[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -70% 0px' }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const newActiveId = headings.reduce((acc, heading) => {
                const element = document.getElementById(heading.id)
                if (element && element.offsetTop <= scrollPosition + 100) {
                    return heading.id
                }
                return acc
            }, '')
            if (newActiveId !== activeId) {
                setActiveId(newActiveId)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [headings, activeId])

    return (
        <nav className="toc">
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block py-1 px-2 text-sm transition-colors duration-200 rounded text-white hover:bg-white/10 ${activeId === heading.id ? 'bg-white/20' : ''}`}
                            onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById(heading.id)
                                if (element) {
                                    const yOffset = -10 // Increased offset to account for fixed header
                                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset
                                    window.scrollTo({top: y, behavior: 'smooth'})
                                }
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TableOfContents