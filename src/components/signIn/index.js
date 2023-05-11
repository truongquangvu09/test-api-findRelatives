import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../loader";
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const authenticatedUser = await reportServices.signIn(
        userInfo.email,
        userInfo.password
      );
      if (authenticatedUser) {
        const type = authenticatedUser.userType;
        console.log("type", type);
        if (type === "admin") {
          setIsLoading(false);
          toast.success("Đăng nhập thành công");
          setIsLoading(true);
          console.log("isLoading", isLoading);
          setTimeout(() => {
            window.location.href = "/register";
            setIsLoading(false);
          }, 20000);
        } else if (type === "user") {
          window.location.href = "/register";
          setIsLoading(false);
          toast.success("Đăng nhập thành công");
        }
      } else {
        toast.error("Email hoặc mật khẩu không chính xác");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Đăng nhập không thành công");
      setIsLoading(false);
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
      {isLoading && <Loader />}
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
