import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PostList from './PostList'

export default function CategoryPage(){
  const { name } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(()=>{
    // Define o termo de busca para a categoria selecionada e volta para a página 1
    const qp = Object.fromEntries([...searchParams])
    qp.q = name
    qp.page = '1'
    setSearchParams(qp)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[name])

  return (
    <section style={{padding:16}}>
      <h2>Categoria: {name}</h2>
      <p>Exibindo artigos da categoria <strong>{name}</strong>.</p>
      <PostList />
    </section>
  )
}
