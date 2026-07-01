import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import '../index.css'
import './header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="site-title"><Link to="/">Blog Computação de Antonio Roque - UFRB</Link></h1>
        <nav className="main-nav">
          <Link to="/">Início</Link>
          <Link to="/about">Sobre</Link>
        </nav>
        <div className="header-actions">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
