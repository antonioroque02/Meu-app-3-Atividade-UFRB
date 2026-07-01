# Blog Computação de Antonio Roque

Projeto final de disciplina: um gerenciador de conteúdo em React com navegação, busca, integração de APIs em português e tema claro/escuro.

## Funcionalidades principais

- Página inicial com listagem de artigos em português
- Página individual de post com comentários locais via localStorage
- Página de categoria que filtra resultados automaticamente
- Página sobre com descrição do blog e contexto da computação no Brasil
- Página 404 para rotas inexistentes
- Busca por palavra-chave em conteúdos em português
- Integração com fontes brasileiras:
  - RSS de portais: G1, Agência Brasil, Tecnoblog
  - Dados públicos do governo via dados.gov.br
- Modo claro/escuro com tema persistente
- Estilização responsiva e componentes reutilizáveis

## Páginas do projeto

- / — Início / listagem de artigos
- /post/:id — Post individual
- /category/:name — Categoria filtrada
- /about — Sobre
- * — 404

## Como usar localmente

`ash
npm install
npm run dev
`

Abra o navegador em:

`ash
http://localhost:5173/
`

## Publicação no GitHub Pages

Este projeto foi configurado para GitHub Pages com base em:

`	ext
https://antonioroque02.github.io/Meu-app-3-Atividade-UFRB/
`

Para publicar:

`ash
npm run deploy
`

## Estrutura de pastas importantes

- src/components/ — componentes React reutilizáveis
- src/contexts/ThemeContext.jsx — contexto de tema claro/escuro
- src/App.jsx — roteamento principal
- src/index.css — estilos globais
- ite.config.js — configuração de base para GitHub Pages

## Sobre o autor

Blog Computação de Antonio Roque — trabalho para disciplina de Desenvolvimento de Software I.
