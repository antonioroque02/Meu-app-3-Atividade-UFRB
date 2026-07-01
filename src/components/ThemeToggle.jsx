import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function ThemeToggle(){
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme} aria-label="Alternar tema">{theme === 'light' ? '🌞' : '🌙'}</button>
  )
}
