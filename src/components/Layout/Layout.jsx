import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
// import { Helmet } from "react-helmet";

function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Box>
        <title>{title}</title> 
      </Box>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "MERN Stack Project",
  keywords: "html,css,mern,react,node,mongodb",
  author: "Prerna Bhargava",
};

export default Layout;
