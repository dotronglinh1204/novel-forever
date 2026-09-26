import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NovelPage from "./pages/NovelPage.jsx";
import ReadPage from "./pages/ReadPage.jsx";
import "./App.css";
import NovelsPage from "./pages/NovelsPage.jsx"; 
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/novels" element={<NovelsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/novel/:slug" element={<NovelPage />} />
          <Route path="/novel/:slug/chapter/:chapterID" element={<ReadPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;