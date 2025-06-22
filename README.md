# 📦Flash Delivery Express – Frontend

Este repositorio contiene el frontend de una plataforma multirubro tipo PedidosYa, desarrollada con React + Vite. Permite a usuarios interactuar como clientes, comercios o repartidores, gestionando pedidos y navegación según el rol.

---

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand) (estado global)
- [Axios](https://axios-http.com/)
- [json-server](https://www.npmjs.com/package/json-server) (pruebas en el front)
- [react-toastify](https://www.npmjs.com/package/react-toastify) (notificaciones para usuarios)
- [SweetAlert2](https://sweetalert2.github.io/) (alertas)
- Estilos: CSS puro, Bootstrap.

---

## 📦 Instalación del proyecto

```bash
git clone https://github.com/usuario/repositorio-frontend.git
cd repositorio-frontend
npm install
npm run dev
```
## 📁 Estructura del proyecto
```bash
src/
├── assets/        → Imagenes usadas en el proyecto
├── components/    → Componentes reutilizables
├── context/       → Almacenamiento de carrito
├── endpoints/     → endpoints para peticiones
├── pages/         → Vistas principales según rol
├── router/        → Enrutamiento
├── store/         → Estado global (Zustand)
├── styles/        → Estilos para componentes
├── App.jsx        → App principal
├── main.jsx       → Entrada principal
```

## 🔐 Manejo de autenticación y roles
- Estado global con Zustand
- Rutas protegidas con ProtectedRoutes.jsx
- Cada ruta se muestra solo si el usuario tiene el rol correcto
```bash
<ProtectedRoutes allowedRoles={["comercio"]}>
  <DashboardVendedor />
</ProtectedRoutes>
```

## 🧭 Navegación
- /login: un solo login universal 

- /registro-cliente: Registro para cliente

- /registro-comercio: Registro para comercio

- /registro-repartidor: Registro para repartidor

- /: Área del cliente

- /dashboard-comercio/:id: Área del comercio

- /dashboard-repartidor/:id: Área del repartidor

Las rutas están protegidas y dependen del rol autenticado.

## 🧠 Funcionalidades principales
- Registro e inicio de sesión por rol

- Visualización de productos por comercio

- Carrito de compras

- Creación de pedidos

- Seguimiento del estado del pedido

- Confirmación de entrega por repartidor

## 🛠️ Desarrollado por
- Giacobbe Franco Diario
- Samaniego Esteban
- Timo Hector
- Morales Juan Daniel
- Ponce Luz
- Ruiz Pablo
