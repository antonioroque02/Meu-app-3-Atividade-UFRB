import React, { useEffect, useState } from 'react'
import './brazil-sources.css'

const RSS_FEEDS = [
  { name: 'G1', url: 'https://g1.globo.com/rss/g1/economia/' },
  { name: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/ultimas-noticias/rss.xml' },
  { name: 'Tecnoblog', url: 'https://tecnoblog.net/feed/' }
]

const ALLORIGINS = 'https://api.allorigins.win/raw?url=' // proxy to avoid CORS

function parseRss(text){
  try{
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'application/xml')
    const items = Array.from(doc.querySelectorAll('item'))
    return items.map(it=>({
      title: it.querySelector('title')?.textContent || '',
      link: it.querySelector('link')?.textContent || '',
      description: it.querySelector('description')?.textContent || ''
    }))
  }catch(e){ return [] }
}

export default function BrazilSources(){
  const [feeds, setFeeds] = useState({})
  const [datasets, setDatasets] = useState([])

  useEffect(()=>{
    async function loadFeeds(){
      const results = {}
      await Promise.all(RSS_FEEDS.map(async f=>{
        try{
          const res = await fetch(ALLORIGINS + encodeURIComponent(f.url))
          if(!res.ok) return
          const text = await res.text()
          results[f.name] = parseRss(text).slice(0,5)
        }catch(e){ results[f.name] = [] }
      }))
      setFeeds(results)
    }

    async function loadDatasets(){
      try{
        const res = await fetch('https://dados.gov.br/api/3/action/package_search?q=computação&rows=6')
        if(!res.ok) return
        const json = await res.json()
        const items = json.result && json.result.results ? json.result.results : []
        setDatasets(items.map(d=>({ title: d.title, url: d.url || d.landing_page || '' })))
      }catch(e){ setDatasets([]) }
    }

    loadFeeds()
    loadDatasets()
  },[])

  return (
    <section className="brazil-sources">
      <h3>Fontes brasileiras</h3>
      <div className="feeds-grid">
        <div className="feed-column">
          <h4>Notícias (RSS)</h4>
          {RSS_FEEDS.map(f=> (
            <div key={f.name} className="feed-block">
              <strong>{f.name}</strong>
              <ul>
                {(feeds[f.name]||[]).map((it,idx)=> (
                  <li key={idx}><a href={it.link} target="_blank" rel="noreferrer">{it.title}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="feed-column">
          <h4>Dados Públicos (dados.gov.br)</h4>
          <ul>
            {datasets.map((d, i)=> (
              <li key={i}><a href={d.url || '#'} target="_blank" rel="noreferrer">{d.title}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
