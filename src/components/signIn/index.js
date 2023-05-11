import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as reportServices from "../../apiServer/report";
import "../account/account.css";

function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  console.log("userInfo", userInfo);

  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authenticatedUser = await reportServices.signIn(
        userInfo.email,
        userInfo.password
      );
      if (authenticatedUser) {
        const { type } = authenticatedUser.type;
        console.log("type: ", type);
        if (type === "admin") {
          window.location.href = "/register";
          toast.success("Đăng nhập thành công");
        } else if (type === "user") {
          window.location.href = "/register";
          toast.success("Đăng nhập thành công");
        }
      } else {
        toast.error("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công");
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await reportServices.list();
      console.log(result);
      setData(result);
    };
    console.log(data);

    fetchApi();
  }, []);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <div className="account-page">
        <form className="form-input" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập email của bạn"
            onChange={handleInputChange}
            value={userInfo.email}
          />
          <label>password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập password của bạn"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
