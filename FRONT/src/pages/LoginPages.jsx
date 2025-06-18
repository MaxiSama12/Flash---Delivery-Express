import React from "react";
import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const LoginPages = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPages;
