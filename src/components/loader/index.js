import React from "react";
import styles from "./Loader.module.scss";
import VAyR from "../../assets/img/VAyR.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img style={{ width: 50 }} src={VAyR} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
