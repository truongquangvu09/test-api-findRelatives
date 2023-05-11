import React, { useState, useEffect } from "react";
import * as reportServices from "../../apiServer/report";
import "./account.css";

function Account() {
  const [userInfo, setUserInfo] = useState({
    name: "",
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
    // event.preventDefault();
    await reportServices.create(
      userInfo.name,
      userInfo.email,
      userInfo.password
    );
  };

  const handleDelete = async (id) => {
    await reportServices.deleteAccount(id);
    setData(data.filter((item) => item.id !== id));
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
    <div className="account-page">
      <form className="form-input" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Nhập name của bạn"
          value={userInfo.name}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Nhập email của bạn"
          value={userInfo.email}
          onChange={handleInputChange}
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
        <button type="submit">Tạo tài khoản</button>
      </form>

      <div className="data-account">
        <h1>Thông tin account</h1>
        {data.map((item, index) => {
          return (
            <div className="info" key={index}>
              <ul className="list-info">
                <li>{item.report_name}</li>
                <li>{item.email}</li>
                <li>{item.password}</li>
                <li>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    xóa
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Account;
