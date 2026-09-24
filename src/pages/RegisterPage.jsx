import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./AuthPage.css";
export default function LoginPage() {
    return (
        <div className="auth-page">
            <div className="auth-header">
                <img className="auth-logo" src={logo} alt="Logo" />
                <h3>Đăng ký</h3>
            </div>
            <form className="auth-form">
                <p>Email</p>
                <input className="auth-email" type="email" placeholder="Email" />
                <p>Mật khẩu</p>
                <input className="auth-password" type="password" placeholder="Password" />
                <p>Nhập lại mật khẩu</p>
                <input className="auth-password" type="password" placeholder="Password" />
                <button className="auth-button" type="submit">Đăng nhập</button>
            </form>
            <div className="register-link">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></div>
        </div>
    )
}