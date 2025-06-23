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
BACK
|_config
|   |_db.js
|_Controller
|   |_categoria.controller.js
|   |_cliente.controller.js
|   |_comercio.controller.js
|   |_login.controller.js
|   |_pago.controller.js
|   |_pedido.controller.js
|   |_producto.controller.js
|   |_repartidor.controller.js
|   |_rubro.controller.js
|_router
|   |_index.js
|_.env
|_.env.example
|_index.js

FRONT
|_src
|  |_components
|  |     |
|  |     |_auth
|  |     |   |_LoginForm.jsx
|  |     |   |_RegisterFormRepartidor.jsx
|  |     |   |_RegisterFormComercio.jsx
|  |     |   |_RegisterFormRepartidor.jsx
|  |     |
|  |     |_dashboard
|  |     |   |_RepartidorDashboard.jsx
|  |     |   |_VendedorDashboard.jsx
|  |     |
|  |     |_layout
|  |     |   |_Footer.jsx
|  |     |   |_Navbar.jsx
|  |     |
|  |     |_ui
|  |     |  |_Card.jsx
|  |     |  |_Cart.jsx
|  |     |  |_CatalogoHomePage.jsx
|  |     |  |_CommerceCarousel.jsx
|  |     |  |_HeroComercioPage.jsx
|  |     |  |_HeroHomePage.jsx
|  |     |  |_InfoHomePage.jsx
|  |     |  |_ListaComercios.jsx
|  |     |  |_Navbar.jsx
|  |     |  |_ProductosComercioPage.jsx
|  |     |  |_SectionRegister.jsx
|  |     |
|  |     |_utils
|  |     |   |_ProtectedRoutes.jsx
|  |     |
|  |     |_context
|  |     |   |_useCartStore.js
|  |     |   |_useLogin.js
|  |     |
|  |     |_endpoints
|  |     |   |_endpoints.jsx
|  |     |
|  |     |_hooks
|  |     |   |_useGet.js
|  |     |
|  |     |_pages
|  |      |   |_MisDirecciones
|  |      |   |    |_misDirecciones.css
|  |      |   |    |_MisDirecciones.jsx
|  |      |   |    |_ModalAgregarDireccion.jsx
|  |      |   |_ComercioPage.jsx
|  |      |   |_HomePage.jsx
|  |      |   |_ListaComerciosPage.jsx
|  |      |   |_LoginPages.jsx
|  |      |   |_NotFound.jsx
|  |      |   |_RegisterClientePages.jsx
|  |      |   |_RegisterComercioPages.jsx
|  |      |   |_RegisterRepartidorPages.jsx
|  |      |
|  |      |_router
|  |      |   |_axiosInstance.js
|  |      |   |_route.js
|  |      |
|  |      |_store
|  |      |   |_authStore.js
|  |      |
|  |      |_styles
|  |          |_card.css
|  |          |_carousel.css
|  |          |_cart.css
|  |          |_comercio.css
|  |          |_home.css
|  |          |_ListaComercios.css
|  |          |_LoginForm.css
|  |          |_navbar.css
|  |          |_notfound.css
|  |          |_RegisterForm.css
|  |          |_sectionRegister.css
|  | 
|  |_App.jsx      
|  |_index.css
|  |_main.jsx
|
|_index.html
|_package.json



```
## 🧭 Navegación y Rutas de la Aplicación 
 
La plataforma Flash Delivery Express organiza sus vistas y funcionalidades a través de un sistema de enrutamiento declarativo utilizando React Router DOM. Cada ruta está diseñada para guiar al usuario a la sección apropiada de la aplicación, y la mayoría de ellas están protegidas para asegurar que solo los usuarios con el rol adecuado puedan acceder.

/login

Propósito: Este es el punto de entrada universal para la autenticación de todos los usuarios. Permite a clientes, comercios y repartidores iniciar sesión con sus credenciales.
Acceso: Es una ruta pública, accesible para cualquier persona que intente iniciar sesión en la aplicación.
Funcionamiento: Envía las credenciales al backend y, tras una autenticación exitosa, almacena el token y el rol del usuario en el estado global (Zustand) antes de redirigirlo a su área correspondiente.

/registro-cliente

Propósito: Formulario dedicado para que los nuevos usuarios se registren como clientes en la plataforma.
Acceso: Público.
Funcionamiento: Captura los datos del nuevo cliente y los envía al backend para la creación de la cuenta.

/registro-comercio

Propósito: Formulario para que los negocios puedan registrarse y crear una cuenta de comercio dentro de la plataforma.
Acceso: Público.
Funcionamiento: Recopila la información necesaria del comercio y la envía al backend para su registro.

/registro-repartidor

Propósito: Formulario diseñado para que los individuos se registren y puedan operar como repartidores para el servicio.
Acceso: Público.
Funcionamiento: Obtiene los datos del futuro repartidor y los gestiona para su alta en el sistema.

/ (Ruta Raíz / Home)

Propósito: Después de la autenticación, esta es el área principal para el cliente. Aquí pueden explorar comercios, visualizar productos, aplicar filtros y gestionar su experiencia de compra.
Acceso: Protegido. Principalmente diseñada para clientes. Otros roles (comercio, repartidor) pueden acceder a esta ruta pero la aplicación puede redirigirlos automáticamente a su respectivo dashboard o mostrar una vista genérica si no es su área principal.
Manejo de roles: El componente ProtectedRoutes asegura que solo los usuarios autenticados puedan acceder.

/dashboard-comercio/:id

Propósito: Este es el panel de control exclusivo para los comercios. Desde aquí, pueden gestionar su catálogo de productos, visualizar y procesar pedidos entrantes, actualizar el estado de los pedidos y acceder a estadísticas de su negocio. El parámetro :id en la URL representa el identificador único del comercio autenticado.
Acceso: Protegido. Exclusivamente accesible para usuarios con el rol comercio.
Manejo de roles: La ruta está envuelta por ProtectedRoutes que verifica explícitamente el rol del usuario.

/dashboard-repartidor/:id

Propósito: Es el panel de control dedicado a los repartidores. Les permite ver los pedidos disponibles para entrega, aceptar asignaciones, gestionar sus entregas activas, y actualizar el estado de los pedidos en tiempo real. El parámetro :id representa el identificador único del repartidor autenticado.
Acceso: Protegido. Exclusivamente accesible para usuarios con el rol repartidor.
Manejo de roles: Similar a las rutas de comercio, ProtectedRoutes garantiza que solo los repartidores accedan.




## 🧠 Funcionalidades Principales 

 El frontend de Flash Delivery Express implementa un conjunto de funcionalidades clave para permitir una interacción fluida y completa para cada tipo de usuario.

Registro e Inicio de Sesión por Rol

Descripción: La aplicación soporta un sistema de autenticación unificado que permite a usuarios registrarse e iniciar sesión con roles específicos: cliente, comercio o repartidor.
Implementación:
Los formularios de registro envían datos a endpoints específicos del backend (/api/registro-cliente, etc.).
El formulario de login (/login) envía credenciales a un endpoint genérico de autenticación.
Tras una autenticación exitosa, el backend devuelve un token de autenticación y el rol del usuario.
Esta información se almacena de forma segura en el estado global (Zustand), permitiendo que la aplicación se adapte al rol del usuario.
Las notificaciones de éxito o error (usando react-toastify) guían al usuario durante el proceso.

Visualización de Productos por Comercio

Descripción: Los clientes pueden explorar un catálogo de productos, organizados por diferentes comercios, y aplicar filtros de búsqueda.
Implementación:
En la página principal (/), se realizan llamadas a la API (ej., GET /api/comercios o GET /api/productos) para obtener listados.
Los productos se muestran utilizando componentes reutilizables como ProductCard.jsx, que encapsulan la lógica y la UI de un solo producto.
Se pueden implementar filtros y barras de búsqueda para mejorar la experiencia del usuario (por ejemplo, por categoría de producto, nombre del comercio).

Carrito de Compras

Descripción: Permite a los clientes seleccionar y acumular productos de diferentes comercios antes de realizar un pedido final. El carrito mantiene un registro de las cantidades y calcula el subtotal.
Implementación:
Se gestiona mediante un store de Zustand dedicado al carrito (store/cartStore.js o context/CartContext.jsx).
Los usuarios pueden añadir, eliminar y ajustar la cantidad de productos en el carrito.
La interfaz del carrito muestra un resumen claro de los ítems seleccionados y el total a pagar.

Creación de Pedidos

Descripción: Una vez que el cliente ha finalizado su selección en el carrito, puede proceder a convertir su carrito en un pedido formal, especificando la dirección de entrega y otros detalles necesarios.
Implementación:
Se recopila la información del carrito (productos, cantidades, ID del comercio/cliente) y detalles de entrega.
Se realiza una petición POST al backend (ej., POST /api/pedidos/crear) para registrar el nuevo pedido en la base de datos.
Las alertas de confirmación (SweetAlert2) o notificaciones (react-toastify) informan al usuario sobre el éxito o fracaso del pedido.

Seguimiento del Estado del Pedido

Descripción: Permite a los clientes, comercios y repartidores monitorear el progreso de los pedidos a través de diferentes estados (ej., pendiente, preparando, en camino, entregado, cancelado).
Implementación:
Clientes: Acceden a una sección "Mis Pedidos" (ej., GET /api/pedidos-cliente/:id_cliente) para ver el estado actual de sus compras.
Comercios: Desde su dashboard, acceden a los pedidos pendientes de su negocio (ej., GET /api/pedidos-comercio/:id_comercio) y pueden actualizarlos a preparando o listo para recoger (vía PUT /api/pedidos/:id/actualizar-estado).
Repartidores: Pueden ver pedidos disponibles (ej., GET /api/pedidos-disponibles), aceptar un pedido y actualizar su estado a en camino o entregado (vía PUT /api/pedidos/:id/actualizar-estado).

Confirmación de Entrega por Repartidor

Descripción: Es el paso final en el ciclo de vida de un pedido, donde el repartidor verifica y confirma que el pedido ha sido entregado exitosamente al cliente.
Implementación:
En el dashboard del repartidor, hay una interfaz para gestionar sus pedidos asignados.
Al completar una entrega, el repartidor interactúa con la UI (ej., un botón "Marcar como Entregado").
Esto dispara una solicitud PUT al backend (ej., PUT /api/pedidos/:id_pedido/entregado) para cambiar el estado final del pedido a entregado.



## 🛠️ Desarrollado por

Este proyecto fue desarrollado colaborativamente por el siguiente equipo:

Giacobbe Franco
Samaniego Esteban
Timo Gabriel 
Morales Juan
Ponce Micaela
Ruiz Pablo
