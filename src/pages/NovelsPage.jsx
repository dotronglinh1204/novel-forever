import {novels} from "../data/novels.js";
import NovelCard from "../components/NovelCard.jsx";
import {useEffect, useState, useRef } from "react";
import "./NovelsPage.css";
import {useSearchParams} from "react-router-dom";
import removeVietnameseTones from "../utils/removeVietnameseTones.js";
export default function NovelsPage() {
    const novelsPerPage = 10;
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const currentPage = parseInt(page);
    const keyword = searchParams.get("keyword") || "";
    const normalizeKeyword = removeVietnameseTones(keyword).toLowerCase();
    const [selectedGenre, setSelectedGenre] = useState("");
    const filteredNovels = novels.filter(
        (novel) =>  {
                const genreCondition = selectedGenre === "" || novel.genres.includes(selectedGenre);
                const keywordCondition = normalizeKeyword === "" ||  removeVietnameseTones(novel.title).toLowerCase().includes(normalizeKeyword)
                || removeVietnameseTones(novel.author).toLowerCase().includes(normalizeKeyword) || novel.genres.some((genre) => removeVietnameseTones(genre).toLowerCase().includes(normalizeKeyword));
                return genreCondition && keywordCondition;
            })
    const genres = [...new Set(
        novels.flatMap((novel) => novel.genres)
    )];
    const isFirstRender = useRef(true);
    const previousKeyword = useRef(keyword);
    const previousSelectedGenre = useRef(selectedGenre);
    useEffect(()=> {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if(keyword !== previousKeyword.current || selectedGenre !== previousSelectedGenre.current) {
            setSearchParams(
                (prev) => {prev.set("page", "1"); 
            return prev});
        }
        previousKeyword.current = keyword;
        previousSelectedGenre.current = selectedGenre;
    }, [keyword, selectedGenre]);
    const startIndex = (currentPage - 1) * novelsPerPage;
    const endIndex = startIndex + novelsPerPage;
    const totalPages = Math.ceil(filteredNovels.length / novelsPerPage);
    const paginatedNovels = filteredNovels.slice(startIndex, endIndex);
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);
    const visiblePages = [1]; 
    if (currentPage - 2 > 1) {
        visiblePages.push("...");
    }
    if (currentPage > 2) {
        visiblePages.push(currentPage - 1);
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
        visiblePages.push(currentPage);
    }
    if (currentPage < totalPages - 1) {
        visiblePages.push(currentPage + 1);
    }
    if (currentPage + 2 < totalPages) {
        visiblePages.push("...");
    }
    visiblePages.push(totalPages);
    const pageToShow = totalPages > 5 ? visiblePages : pageNumbers;
    return(
        <div>
            <h4>Danh sách truyện {`(${filteredNovels.length} bộ)`}</h4>
            <select className="genre-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} >
                <option value="">Tất cả thể loại</option>
                {
                    genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))
                }
            </select>
            <div className="novel-list">
                {filteredNovels.length === 0 ?
                    <p>Hiện chưa có truyện thuộc thể loại này</p>
                    
                :paginatedNovels.map((novel) => (
                    <NovelCard novel={novel} key={novel.id} />
                ))}
            </div>
            <div className="pagination">
                <button className="pagination-nav" onClick={() => setSearchParams(
                    (prev) =>{prev.set("page", String(currentPage - 1));
                    return prev})} 
                    disabled={currentPage === 1}>
                    Trước
                </button>
                {pageToShow.map((pageNumber) => (
                    pageNumber === "..." ?
                    <span className="pagination-ellipsis" key={`ellipsis-${index}`}>...</span>
                    :
                    <button key={pageNumber} 
                    onClick={() => setSearchParams(
                        (prev) => {prev.set("page", String(pageNumber)); 
                        return prev})} 
                        className={
                            currentPage === pageNumber
                                ? "pagination-page-number active"
                                : "pagination-page-number"
                    }>
                        {pageNumber}
                    </button>
                ))}
                <button className="pagination-nav" onClick={() => setSearchParams(
                    (prev) => {prev.set("page", String(currentPage + 1)); 
                    return prev})} 
                    disabled={currentPage === totalPages}>
                    Sau
                </button>
            </div>
        </div>
    )
}