import React from "react";
import Header from "./header/header";
import Footer from "./Footer";
import { Container } from "../../Styles";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
