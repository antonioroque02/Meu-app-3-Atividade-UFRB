import React from 'react'
import './post-card.css'
import { Link } from 'react-router-dom'

export default function PostCard({ post }){
  return (
    <article className="post-card">
      <h4 className="post-card-title"><Link to={`/post/${post.id}`}>{post.title}</Link></h4>
      <p className="post-card-excerpt">{post.body.slice(0,120)}...</p>
      <div className="post-card-tags">
        {post.tags.map(t=> <span key={t} className="post-tag">{t}</span>)}
      </div>
      <div className="post-card-category">Categoria: {post.category}</div>
    </article>
  )
}
