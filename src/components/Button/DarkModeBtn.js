'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MenuItem, Select } from "@mui/material";

const darkBtnStyle = "bg-gray-800 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-full mt-1"
const lightBtnStyle = "bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-1 px-3 rounded-full mt-1"

const DarkModeBtn = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()
    const currentTheme = theme == "system" ? systemTheme : theme;

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <>
            {/* 
            <Select
                value={theme}
                onChange={(a) => setTheme(a.target.value)}
            >
                <MenuItem value="system">System</MenuItem>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
            </Select>
            */}

            <button
                className={currentTheme == "dark" ? lightBtnStyle : darkBtnStyle}
                onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}
            >
                {currentTheme == "light" ? "🌙" : "🌞"}
            </button>
        </>
    )
}
export default DarkModeBtn