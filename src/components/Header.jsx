import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "./Header.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import books from "../assets/books.svg";
import ranking from "../assets/ranking.svg";
export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const closeDrawer = () => setIsOpen(false);
    return(
        <header className="header">
            <div className="header-content">
            <Link to="/">
                <img className="logo" src={logo} alt="Trang chủ"></img>
                <h3>NovelForever</h3>
            </Link>
            <button className="search-button-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}><img className="search-icon" src="/icons/search.png" alt="Search"></img></button>
            <ul className="menu">
                <li><Link to="/novels">Kho Truyện</Link></li>
                <li><Link to="/login">Đăng Nhập</Link></li>
            </ul>
            <button className="menu-button" onClick={() => setIsOpen(true)}><img className="menu-icon" src="/icons/menu.png" alt="Menu"></img></button>
                <div className={isOpen ? "drawer-overlay open" : "drawer-overlay"} >
                    <div className={isOpen ? "drawer open" : "drawer"}>
                        <button className="close-button" onClick={() => setIsOpen(false)}><img className="close-icon" src="/icons/close.png" alt="Close"></img></button>
                        <div className="drawer-content">
                            <img className="logo" src={logo} alt="Logo" />
                            <div className="drawer-auth-link">
                                <Link to="/login" onClick={closeDrawer}>Đăng Nhập</Link>
                                <Link to="/register" onClick={closeDrawer}>Đăng ký tài khoản</Link>
                            </div>
                            <div>
                                <div className="drawer-books">
                                    <img className="drawer-icon" src={books} alt="Books"></img>
                                    <h4><Link to="/novels" onClick={closeDrawer}>Kho Truyện</Link></h4>
                                </div>
                                <ul className="drawer-books-list">
                                    <li><Link to="/novels" onClick={closeDrawer}>Truyện mới</Link></li>
                                    <li><Link to="/novels" onClick={closeDrawer}>Truyện full</Link></li>
                                </ul>
                            </div>
                            <div>
                                <div className="drawer-books">
                                    <img className="drawer-icon" src={ranking} alt="Ranking"></img>
                                    <h4><Link to="/novels" onClick={closeDrawer}>Xếp hạng</Link></h4>
                                </div>
                                <ul className="drawer-books-list">
                                    <li><Link to="/novels" onClick={closeDrawer}>Xếp hạng lượt đọc</Link></li>
                                    <li><Link to="/novels" onClick={closeDrawer}>Xếp hạng đánh giá</Link></li>
                                    <li><Link to="/novels" onClick={closeDrawer}>Xếp hạng bình luận</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isSearchOpen && <SearchBar />}
        </header>
    );
}