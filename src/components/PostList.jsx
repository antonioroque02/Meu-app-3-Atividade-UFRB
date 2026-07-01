import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import Pagination from './Pagination'
import { Link, useSearchParams } from 'react-router-dom'
import BrazilSources from './BrazilSources'

const DEFAULT_QUERY = 'computação'

function extractTags(title) {
  return title.split(' ').slice(0,3).map(t=>t.replace(/[^\p{L}0-9]/gu,'').toLowerCase())
}

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || DEFAULT_QUERY
  const pageParam = parseInt(searchParams.get('page')||'1',10)

  useEffect(()=>{
    async function load(){
      try{
        setLoading(true)
        // Pesquisa no Wikipedia em português
        const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=50&format=json&origin=*`
        const res = await fetch(url)
        if(!res.ok) throw new Error('Erro ao carregar conteúdo em Português')
        const json = await res.json()
        const results = json.query.search || []
        const mapped = results.map(r=>({
          id: r.pageid,
          title: r.title,
          body: r.snippet.replace(/<[^>]+>/g,'').replace(/&quot;/g,'"'),
          category: 'Computação',
          tags: extractTags(r.title)
        }))
        setPosts(mapped)
      }catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    }
    load()
  },[query])

  const [page, setPage] = useState(pageParam)
  const perPage = 6

  useEffect(()=>{ setSearchParams(prev=>{ const qp = Object.fromEntries([...prev]); qp.page = String(page); if(query) qp.q = query; return qp }) },[page, query])

  if(loading) return <p style={{padding:'1rem'}}>Carregando artigos em Português...</p>
  if(error) return <p style={{padding:'1rem'}}>Erro: {error}</p>

  const filtered = posts.filter(p=>{
    if(!query) return true
    const q = query.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.tags.join(' ').includes(q)
  })

  const start = (page-1)*perPage
  const paginated = filtered.slice(start,start+perPage)
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))

  return (
    <section className="container">
      <h2>Artigos encontrados</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
        {paginated.map(p=> <PostCard key={p.id} post={p} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      <aside style={{marginTop:20}}>
        <h3>Categorias</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <Link to={`/category/Computação`}>Computação</Link>
          <Link to={`/category/Tecnologia`}>Tecnologia</Link>
          <Link to={`/category/Educação`}>Educação</Link>
        </div>
        <BrazilSources />
      </aside>
    </section>
  )
}
