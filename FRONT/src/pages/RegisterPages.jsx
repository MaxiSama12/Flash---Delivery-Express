import React from 'react'
import RegisterFormCliente from '../components/auth/RegisterFormCliente'
import RegisterFormVendedor from '../components/auth/RegisterFormVendedor'
import RegisterFormRepartidor from '../components/auth/RegisterFormRepartidor'
const RegisterPages = () => {
  return (
    <>
    <RegisterFormCliente/>
    <RegisterFormVendedor/>
    <RegisterFormRepartidor/>
    </>
  )
}

export default RegisterPages