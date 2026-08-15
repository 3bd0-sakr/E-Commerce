'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'light'

        const savedTheme = window.localStorage.getItem('theme') as Theme | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return savedTheme ?? (prefersDark ? 'dark' : 'light')
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        window.localStorage.setItem('theme', theme)
    }, [theme])

    function toggleTheme() {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
    }

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full bg-white/80 dark:bg-gray-900/80"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="size-4 text-yellow-400" />
            ) : (
                <Moon className="size-4" />
            )}
        </Button>
    )
}
