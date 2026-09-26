import {useParams} from "react-router-dom";
import {novels} from "../data/novels.js";
import {Link} from "react-router-dom";
import {useEffect, useState } from "react";
import {reviews} from "../data/reviews.js";
import {comments} from "../data/comments.js";
import NovelCard from "../components/NovelCard.jsx";
import "./NovelPage.css";
import "../styles/comments.css";
export default function NovelPage() {
    const [activeTab, setActiveTab] = useState("intro");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [novelReviews, setNovelReviews] = useState([]);
    const [novelComments, setNovelComments] = useState([]);
    const [reviewError, setReviewError] = useState("");
    const [commentError, setCommentError] = useState("");
    const { slug } = useParams();
    const novel = novels.find((novel) => novel.slug === slug);
    useEffect(() => {
        if (!novel) {
            return;
        }
        setNovelReviews(reviews.filter((review) => review.novelId === novel.id));
        setNovelComments(comments.filter((comment) => comment.novelId === novel.id));
    }, [novel]);
    if (!novel) {
        return ( 
        <div>
            <h1>Không tìm thấy truyện</h1>
            <Link to="/">
                <p>Quay lại trang chủ</p>
            </Link>
        </div>
        )
    }
    const firstChapter = novel.chapters[0];
    const handleSubmitReview = () => {
        if (rating === 0) {
            return (setReviewError("Vui lòng chọn số sao "))
        } 
        if(reviewContent.trim() === "") {
            return (setReviewError("Vui lòng nhập nội dung đánh giá"))}
        setReviewError("");
        const newReview = {
            id: Date.now(),
            novelId: novel.id,
            user: "Bạn",
            rating: rating,
            content: reviewContent,
        };
        setNovelReviews([...novelReviews, newReview]);
        setRating(0);
        setReviewContent("");
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
    let content;
    if (activeTab === "intro") {
        content = <p className="novel-description">{novel.description}</p>;
    } else if (activeTab === "rating") {
        content = (
        <div className="novel-reviews">
            {novelReviews.length > 0 ? (
                <ul className="novel-list-reviews">
                    {novelReviews.map((review) => (
                        <li className="novel-review" key={review.id}>
                            <h4>{review.user}</h4>
                            <div className="rating-stars">{[1, 2, 3, 4, 5].map(
                                (star) => (
                                <span key={star} className={star <= review.rating ? "star-filled" : "star-empty"}>{star <= review.rating ? "★" : "☆"}</span>))}
                            </div>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có đánh giá</p>
            )}
            <div className="review-form">
                <h3>Đánh giá truyện</h3>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                        className={`star-button ${star <= (hoverRating || rating) ? "star-filled" : "star-empty"}`}
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        > 
                            {star <= (hoverRating || rating) ? "★" : "☆"}
                        </button>
                    ))}
                </div>
                <textarea className="review-input" value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} placeholder="Thêm đánh giá"></textarea>
                <button className="review-submit-button" onClick={handleSubmitReview}>Gửi</button>
                {reviewError && <p className="error">{reviewError}</p>}
            </div>
        </div>
        );
    } else if (activeTab === "comments") {
        content = (
        <div className="novel-comments">
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
            <div className="comment-form">
                <input className="comment-input" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Nhập bình luận"></input>
                <button className="comment-submit-button" onClick={handleSubmitComment}>Gửi</button>
                {commentError && <p className="error">{commentError}</p>}
            </div>
        </div>
        );
    } else if (activeTab === "chapters") {
        content = (
        <div className="novel-chapters">
            {novel.chapters.length > 0 ? (
                <ul className="novel-list-chapters">
                    {novel.chapters.map((chapter) => (
                        <li className="novel-chapter" key={chapter.id}>
                            <Link to={`/novel/${novel.slug}/chapter/${chapter.id}`}>{chapter.title}</Link>
                        </li>
                    ))}
                </ul>) : (
                    <p>Truyện chưa có chương</p>
                )}
        </div>
        );
    }
    const relatedNovels = novels.filter(
        (otherNovel) => otherNovel.genres.some(
            (genre) => novel.genres.includes(genre)) && otherNovel.id !== novel.id);
    return (
        <div className="novel-detail">
            <div className="novel-info">
                <img className="novel-detail-cover" src={novel.cover} alt={novel.title} />
                <div className="novel-detail-info">
                    <h1>{novel.title}</h1>
                    <p>Tác giả:<span> {novel.author} </span></p>
                    <p>Số chương:<span> {novel.chapters.length} </span></p>
                    {firstChapter && (
                        <Link className="novel-detail-actions" to={`/novel/${novel.slug}/chapter/${firstChapter.id}`}>Đọc truyện</Link>
                    )}
                </div>
            </div>
            <div className="novel-detail-content">
                <div className="novel-detail-tabs">
                    <button className={activeTab === "intro" ? "active" : ""} onClick={() => setActiveTab("intro")}>Giới thiệu</button>
                    <button className={activeTab === "rating" ? "active" : ""} onClick={() => setActiveTab("rating")}>Đánh giá</button>
                    <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>Bình luận</button>
                    <button className={activeTab === "chapters" ? "active" : ""} onClick={() => setActiveTab("chapters")}>D.S Chương </button>
                </div>
                <div className="novel-detail-tab-content">
                    {content}
                </div>
                <div>
                    <h2>Truyện liên quan</h2>
                    {relatedNovels.length > 0 ? (
                        <ul className="related-novels">
                            {relatedNovels.map((novel) => (
                                <li key={novel.id}>
                                    <NovelCard novel={novel} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có truyện liên quan</p>
                    )}
                </div>
            </div>
        </div>
    );
}