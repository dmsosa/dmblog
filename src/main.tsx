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
import ArticleEditor from './components/Article/ArticleEditor/ArticleEditor.tsx'
import CommentSection from './routes/Article/CommentSection.tsx'
import Article from './routes/Article/Article.tsx'
import NotFound from './routes/NotFound.tsx'
import ProfileArticles from './routes/Profile/ProfileArticles.tsx'
import ProfileFavArticles from './routes/Profile/ProfileFavArticles.tsx'
import Profile from './routes/Profile/Profile.tsx'
import Settings from './routes/Settings.tsx'


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
              <Route path="profile/:username" element={<Profile />}>
                <Route index element={<ProfileArticles />} />
                <Route path="favorites" element={<ProfileFavArticles />} />
              </Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
