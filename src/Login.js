import "./style/Login.css";
import React, { useEffect } from "react";
function Login() {
  const slide = () => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  };
  useEffect(slide);
  return (
    <div className="container" id="container" style={{marginTop:"50px"}}>
      <div className="form-container sign-up-container">
        <form className="login-form" action="#">
          <h1>Tạo tài khoản</h1>
          <input className="login-input" type="text" placeholder="Name" />
          <input className="login-input" type="email" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Password" />
          <button className="login-btn" >Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="login-form" action="#">
          <h1>Đăng nhập</h1>
          <input className="login-input" type="email" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Password" />
          <a className="login-a" href="#">Quên mật khẩu</a>
          <button  className="login-btn">Đăng nhập</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Chào mừng trở lại!</h1>
            <p>Để tiếp tục liên lạc với chúng tôi vui lòng đăng nhập lại.</p>
            <button className="ghost login-btn" id="signIn">
              Đăng nhập
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Xin chào!</h1>
            <p>
              Nhập thông tin của bạn và tham gia chuyến hành trình của chúng ta.
            </p>
            <button className="ghost login-btn" id="signUp">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <script></script>
    </div>
  );
}
export default Login;
