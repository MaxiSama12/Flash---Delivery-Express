import React from "react";
import RegisterFormCliente from "../components/auth/RegisterFormCliente";
import RegisterFormRepartidor from "../components/auth/RegisterFormRepartidor";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const RegisterPages = () => {
  return (
    <>
      <Navbar />
      <RegisterFormCliente />
      <Footer />
    </>
  );
};

export default RegisterPages;
