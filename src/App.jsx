import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PostList from './components/PostList'
import PostPage from './components/PostPage'
import CategoryPage from './components/CategoryPage'
import About from './components/About'
import NotFound from './components/NotFound'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-root">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
