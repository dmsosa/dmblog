import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './scss/styles.scss'
import AuthProvider from './context/AuthContext.tsx'
import Home from './routes/Home.tsx'
import  Login  from './routes/Login.tsx'
import SignUp from './routes/SignUp.tsx'
import HomeArticles from './routes/HomeArticles.tsx'
import ArticleEditor from './components/Article/ArticleEditor.tsx/ArticleEditor.tsx'
import CommentSection from './routes/Article/CommentSection.tsx'
import Article from './routes/Article/Article.tsx'
import NotFound from './routes/NotFound.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />}>
                <Route index element={<HomeArticles />}/>
              </Route>
              <Route path="login" element={<Login />}/>
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="editor" element={<ArticleEditor />}>
                <Route path=":slug" element={<ArticleEditor />}/>
              </Route>
              <Route path="article/:slug" element={<Article />}>
                <Route index element={<CommentSection />}/>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
