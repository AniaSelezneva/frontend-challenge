import React from "react";
import Header from "./Header";
import styles from "./styles.module.scss";

function Layout(props) {
  return (
    <div className={styles.main}>
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
