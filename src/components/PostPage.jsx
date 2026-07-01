import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useLocalComments(postId){
  const key = `comments_post_${postId}`
  const get = ()=> JSON.parse(localStorage.getItem(key) || '[]')
  const add = (c)=> { const cur = get(); cur.push(c); localStorage.setItem(key,JSON.stringify(cur)) }
  return {get,add}
}

export default function PostPage(){
  const { id } = useParams()
  const [post,setPost] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [comments,setComments] = useState([])
  const [newComment,setNewComment] = useState('')
  const local = useLocalComments(id)

  useEffect(()=>{
    async function load(){
      try{
        setLoading(true)
        // Buscar conteúdo em português no Wikipedia via pageid
        const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${id}&format=json&origin=*`)
        if(!res.ok) throw new Error('Post não encontrado na Wikipédia')
        const json = await res.json()
        const page = json.query && json.query.pages && json.query.pages[id]
        if(!page) throw new Error('Conteúdo não encontrado')
        const postJson = { id: page.pageid, title: page.title, body: page.extract }
        setPost(postJson)
        // comentários locais apenas
        setComments([...local.get()])
      }catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    }
    load()
  },[id])

  function handleAdd(){
    if(!newComment.trim()) return
    const c = { id:Date.now(), name:'Comentário local', body:newComment }
    local.add(c)
    setComments(prev=>[...prev,c])
    setNewComment('')
  }

  if(loading) return <p style={{padding:16}}>Carregando...</p>
  if(error) return <p style={{padding:16}}>Erro: {error}</p>
  if(!post) return <p style={{padding:16}}>Post não encontrado</p>

  return (
    <article style={{padding:16}}>
      <h2>{post.title}</h2>
      <p style={{whiteSpace:'pre-wrap'}}>{post.body}</p>
      <section style={{marginTop:20}}>
        <h3>Comentários</h3>
        <div>
          {comments.map(c=> (
            <div key={c.id} style={{borderTop:'1px solid #eee',padding:'8px 0'}}>
              <strong>{c.name}</strong>
              <p style={{margin:4}}>{c.body}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:12}}>
          <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} rows={3} style={{width:'100%'}} />
          <button onClick={handleAdd} style={{marginTop:8}}>Adicionar comentário</button>
        </div>
      </section>
    </article>
  )
}
