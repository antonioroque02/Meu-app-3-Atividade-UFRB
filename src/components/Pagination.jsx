import React from 'react'
import './pagination.css'

export default function Pagination({ page, totalPages, onChange }){
  function goto(p){ if(p<1) p=1; if(p>totalPages) p=totalPages; onChange(p)}

  return (
    <div className="pagination-wrap">
      <button className="pagination-btn" onClick={()=>goto(page-1)} disabled={page<=1}>Anterior</button>
      <span className="pagination-info">Página {page} de {totalPages}</span>
      <button className="pagination-btn" onClick={()=>goto(page+1)} disabled={page>=totalPages}>Próxima</button>
    </div>
  )
}
