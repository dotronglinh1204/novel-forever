import "./NovelCard.css";
import { Link } from "react-router-dom";

export default function NovelCard ({novel}){
    const {title, author, cover, slug, genres, chapters} = novel;
    return(
        <Link className="novel-card-link" to={`/novel/${slug}`}>
            <div className="novel-card">
                <img className="novel-cover" src = {cover} alt = {title}></img>
                <h1>{title}</h1>
                <h2>Tác giả: {author}</h2>
                <h3>Số chương: {chapters.length} </h3>
                <div className="novel-genres">
                    {genres.slice(0,2).map((genre) => <span key={genre}>{genre}</span>)}
                </div>
            </div>
        </Link>
    )
}
