import logo from "../assets/logo.png";
import "./Footer.css";
export default function Footer () {
    return (
        <footer className="footer-container">
            <div className="footer-logo-container">
                <img className="footer-logo" src={logo} alt="Logo" />
                <p>NovelForever</p>
            </div>
            <p className="footer-text">© 2026 Truyện Chữ.</p>
        </footer>
    )
}