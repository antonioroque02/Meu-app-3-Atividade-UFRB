import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchbar.css'

export default function SearchBar(){
  const [q,setQ] = useState('')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    navigate(`/?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={submit} className="searchbar-form">
      <input className="search-input" placeholder="Buscar artigos..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="search-btn" type="submit">Buscar</button>
    </form>
  )
}
