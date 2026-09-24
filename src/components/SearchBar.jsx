import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchBar.css";
export default function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const handleSearch = () => navigate(`/novels?keyword=${keyword}`);
    return (
        <div className="search-container">
            <input type="text" 
            onKeyDown ={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm tên truyện, tác giả, thể loại..." 
            className="search-bar" 
            value={keyword} 
            onChange ={(e) => setKeyword(e.target.value)} />
            <button className="search-button" onClick={() => handleSearch()}>Tìm kiếm</button>
        </div>
    );
}