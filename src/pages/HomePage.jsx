import {novels} from "../data/novels.js";
import NovelCard from "../components/NovelCard.jsx";
import "./HomePage.css";
import {Link} from "react-router-dom";

export default function HomePage() {
    const featuredNovels = [...novels].sort((a, b) => b.chapters.length - a.chapters.length).slice(0, 5);
    const newNovels = novels.slice(-5);
    const allNovels = novels.slice(0, 10);
    return (
        <div className="home-page">
            <div className="new-novels">
                <h2>Truyện mới</h2>
                <div className="novel-list">
                    {newNovels.map((novel) => (
                        <NovelCard novel={novel} key={novel.id} />
                    ))}
                </div>
            </div>
            <div className="featured-novels">
                <h2>Truyện nổi bật</h2>
                <div className="novel-list">
                    {featuredNovels.map((novel) => (
                        <NovelCard novel={novel} key={novel.id} />
                    ))}
                </div>
            </div>
            <div className="all-novels">
                <Link to="/novels">
                    <h2 className="all-novels-title">Tất cả các truyện</h2>
                </Link>
                <div className="novel-list">
                    {allNovels.map((novel) => (
                        <NovelCard novel={novel} key={novel.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
