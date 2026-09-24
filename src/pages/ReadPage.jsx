import {useEffect,useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {novels} from "../data/novels.js";
import "./ReadPage.css";
import {comments} from "../data/comments.js";
import "../styles/comments.css";
export default function ReadPage() {
    const [chapterContent, setChapterContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {slug, chapterID} = useParams();
    const navigate = useNavigate();
    const novel = novels.find((novel) => novel.slug === slug);
    const chapter = novel?.chapters.find((chapter) => chapter.id === Number(chapterID)); 
    const [comment, setComment] = useState("");
    const [novelComments, setNovelComments] = useState([]);
    const [commentError, setCommentError] = useState("");
    const previousChapter = novel?.chapters.find((chapter) => chapter.id === Number(chapterID) - 1);
    const nextChapter = novel?.chapters.find((chapter) => chapter.id === Number(chapterID) + 1);
    const previousLink = previousChapter ? `/novel/${novel.slug}/chapter/${previousChapter.id}` : `/novel/${novel.slug}`;
    const nextLink = nextChapter ? `/novel/${novel.slug}/chapter/${nextChapter.id}` : `/novel/${novel.slug}`;
    useEffect(() => {  
        if (!chapter) {
            return;
        }
        const controller = new AbortController();
        let active = true ;
        async function loadChapter(){
            setChapterContent("");
            setLoading(true);
            setError(null);
        try {
            const response = await fetch(chapter.file, {signal: controller.signal});
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const content = await response.text();
            if (!content) {
                throw new Error("Content is empty");
            }
            if (active) {
            setChapterContent(content);
            }
        }
        catch (error) {
            if (error.name === "AbortError") {
                return;
            }
            if (active){
                setError(error);
            }
        }
        finally {
            if (active) {
                setLoading(false);
            }
        }
    }
        loadChapter();
        return () => {
            active = false;
            controller.abort();
        };
        
    }, [chapter]);
    useEffect(() => {
        if (!novel) {
            return;
        }
        setNovelComments(comments.filter((comment) => comment.novelId === novel.id));
    }, [novel]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft" && previousChapter) {
                navigate(previousLink);
            }

            if (event.key === "ArrowRight" && nextChapter) {
                navigate(nextLink);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
}, [previousChapter, nextChapter, previousLink, nextLink, navigate]);
    if (!novel) {
        return (
            <div>
                <h1>Không tìm thấy truyện</h1>
                <Link to="/">
                    <p>Quay lại trang chủ</p>
                </Link>
            </div>
        );
    }
    if (!chapter) {
        return (
            <div>
                <h1>Không tìm thấy chương</h1>
                <Link to="/">
                    <p>Quay lại trang chủ</p>
                </Link>
            </div>
        );
    }
    const handleSubmitComment = () => {
        if(comment.trim() === "") {
            return (setCommentError("Vui lòng nhập nội dung bình luận"))
        }
        setCommentError("");
        const newComment = {
            id: Date.now(),
            novelId: novel.id,
            user: "Bạn",
            content: comment,
        };
        setNovelComments([...novelComments, newComment]);
        setComment("");
    }
    const paragraphs = chapterContent.split(/\n\s*\n/);
    return ( 
        <div className="read-page">
            <Link to={`/novel/${novel.slug}`} className="novel-reading-title">{novel.title}</Link>
            <div className="chapter-navigation-top">
                <Link to={previousLink}>
                    {previousChapter ? "← Chương trước" : "← Về trang truyện"}
                </Link>
                <select
                className="chapter-select"
                value = {chapterID}
                onChange = {(e) => navigate(`/novel/${novel.slug}/chapter/${e.target.value}`)}
                >
                    {novel.chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                            {chapter.title}
                        </option>
                    ))}
                </select>
                <Link to={nextLink}>
                    {nextChapter ? "Chương sau →" : "Về trang truyện →"}
                </Link>
            </div>

            {loading && (
                <p>Loading...</p>
            )}
            {!loading && error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && chapterContent && (
                <div className="chapter-content">
                    <h4>{chapter.title}</h4>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            )}
            <div className="chapter-navigation-bottom">
                <Link to={previousLink}>
                    {previousChapter ? "← Chương trước" : "← Về trang truyện"}
                </Link>
                <Link to={nextLink}>
                    {nextChapter ? "Chương sau →" : "Về trang truyện →"}
                </Link>
            </div>
            <div className="novel-comments">
                <h3>Danh sách bình luận</h3>
                <div className="comment-form">
                    <input className="comment-input" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Nhập bình luận"></input>
                    <button className="comment-submit-button" onClick={handleSubmitComment}>Gửi</button>
                    {commentError && <p className="error">{commentError}</p>}
                </div>
                {novelComments.length > 0 ? (
                    <ul className="novel-list-comments">
                        {novelComments.map((comment) => (
                            <li className="novel-comment" key={comment.id}>
                                <h4>{comment.user}</h4>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Chưa có bình luận</p>
                )}
            </div>
        </div>
    );
}
 