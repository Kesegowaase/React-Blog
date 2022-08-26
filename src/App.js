import TopBar from "./components/TopBar";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import { useSelector } from 'react-redux'
import { Suspense } from 'react'
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NewArticle from "./pages/NewArticle"
import UpdateArticle from "./pages/UpdateArticle";
import ShowArticle from "./pages/ShowArticle";

function App() {

  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.authReducer.isLoggedIn
    }
  });
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={null}>
          <TopBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            {!isLoggedIn && <Route path="/login" element={<SigninPage />} />}
            <Route path="/register" element={<SignupPage />} />
            {isLoggedIn && <Route path="/editor" element={<NewArticle />} />}
            {isLoggedIn && <Route path="/editor/:articleSlug" element={<UpdateArticle />} />}
            <Route path="/article/:articleSlug" element={<ShowArticle />} />
            {isLoggedIn && <Route path="/settings" element={<Settings />} />}
            <Route path="/@:username" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
