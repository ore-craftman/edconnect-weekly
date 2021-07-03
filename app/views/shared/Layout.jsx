import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <Header userDetails={props.userInstance} />
      <main className="container"> {props.children} </main>
      <Footer />
    </>
  );
};

export default Layout;
