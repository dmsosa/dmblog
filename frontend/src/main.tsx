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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/editor" element={<ArticleEditor />}>
              <Route path=":slug" element={<ArticleEditor />} />
            </Route>
            <Route path="/article/:slug" element={<Article />}>
              <Route index element={<CommentSection />} />
            </Route>
            <Route path="/user/:username" element={<Profile />}>
            </Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </AuthProvider>      
    </BrowserRouter>
  </React.StrictMode>,
);
