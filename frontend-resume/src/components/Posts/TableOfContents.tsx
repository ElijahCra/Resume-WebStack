'use client'

import React, { useEffect, useState } from 'react'

interface TableOfContentsProps {
    headings: { id: string; text: string; level: number }[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    const [activeId, setActiveId] = useState(headings[0].id)
    const yOffset = -18

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            let currentActiveId = ''

            for (let i = headings.length - 1; i >= 0; i--) {
                const element = document.getElementById(headings[i].id)
                if (element && element.offsetTop <= scrollPosition - yOffset) {
                    currentActiveId = headings[i].id
                    break
                }
            }

            if (currentActiveId === ''){currentActiveId = headings[0].id}
            if (currentActiveId !== activeId) {
                setActiveId(currentActiveId)
            }

        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [headings, activeId, yOffset])

    const scrollToHeading = (headingId: string) => {
        const element = document.getElementById(headingId)
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <nav className="toc">
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level-1) * 25+10}px` }}>
                        <a
                            href={`#${heading.id}`}
                            className={activeId === heading.id ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToHeading(heading.id)
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