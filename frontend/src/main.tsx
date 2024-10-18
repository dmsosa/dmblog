import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import ArticleEditor from "./components/Article/ArticleEditor/ArticleEditor.tsx";
import CommentSection from "./routes/Article/CommentSection.tsx";
import Article from "./routes/Article/Article.tsx";
import NotFound from "./routes/NotFound.tsx";
import Profile from "./routes/Profile/Profile.tsx";
import Settings from "./routes/Settings.tsx";
import Register from "./routes/Register.tsx";
import "./assets/css/styles.css"
import SearchArticles from "./routes/SearchArticles.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/dmblog/" element={<Home />} />
            <Route path="/dmblog/login" element={<Login />} />
            <Route path="/dmblog/register" element={<Register />}></Route>
            <Route path="/dmblog/editor" element={<ArticleEditor />}>
              <Route path=":slug" element={<ArticleEditor />} />
            </Route>
            <Route path="/dmblog/article/:slug" element={<Article />}>
              <Route index element={<CommentSection />} />
            </Route>
            <Route path="/dmblog/user/:username" element={<Profile />}>
            </Route>
            <Route path="/dmblog/articles" element={<SearchArticles />}>
            </Route>
            <Route path="/dmblog/articles/:search" element={<SearchArticles />}>
            </Route>
            <Route path="/dmblog/settings" element={<Settings />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </AuthProvider>      
    </BrowserRouter>
  </React.StrictMode>,
);
