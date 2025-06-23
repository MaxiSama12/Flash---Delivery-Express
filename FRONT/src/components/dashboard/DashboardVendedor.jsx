import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
} from "react-bootstrap";
import { axiosInstance } from "../../router/axiosInstance";
import HeroComercioPage from "../ui/HeroComercioPage";

const VendedorDashboard = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState({});
  const [productos, setProductos] = useState([]);
  const [pedidoProductos, setPedidoProductos] = useState([]);
  const [modalGestionProductos, setModalGestionProductos] = useState(false);
  const [modalAgregarEditar, setModalAgregarEditar] = useState(null);
  const [modalPedidos, setModalPedidos] = useState(false);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });

  const [categorias, setCategorias] = useState([]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    url_imagen: "",
    id_categoria: "",
  });

  const [productoEditar, setProductoEditar] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    url_imagen: "",
    id_categoria: "",
  });

  const calcularStats = (listaPedidoProductos) => {
    const totalOrders = listaPedidoProductos.length;
    const pendingOrders = listaPedidoProductos.filter(
      (p) => p.estado === "pendiente"
    ).length;
    const completedOrders = listaPedidoProductos.filter(
      (p) => p.estado === "completado"
    ).length;
    const totalEarnings =
      listaPedidoProductos
        .filter((p) => p.estado === "completado")
        .reduce((sum, p) => sum + p.total, 0) || 0;

    setStats({ totalOrders, pendingOrders, completedOrders, totalEarnings });
    console.log(stats);
  };

  const updateEstadoPedido = async (id_pedido) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/pedido/${id_pedido}/editar`, {
        nuevo_estado: "completado",
      });
      const pedidoProductoRes = await axiosInstance.get(
        `/pedidos-comercio/${id}`
      );

      setPedidoProductos(pedidoProductoRes.data.pedidos);

      Swal.fire({
        icon: "success",
        title: "Pedido actualizado",
        text: "El estado del pedido ha sido actualizado correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado del pedido.",
      });
    } finally {
      setLoading(false);
    }
  };

  const cerrarComercio = async () => {
    try {
      const res = await axiosInstance.put(`/comercio/${id}/editar`);

      Swal.fire({
        icon: "success",
        title: `${res.data.mensaje}`,
        timer: 1500,
        showConfirmButton: false,
      });

      obtenerDatos();
    } catch (error) {
      console.error("Error al cerrar el comericio", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cerarr el comercio. Intente más tarde.",
      });
    }
  };

  const obtenerDatos = async () => {
    try {
      const resComercio = await axiosInstance.get(`/comercio/${id}`);
      setComercio(resComercio.data.comercio[0]);
      console.log("comercio en dashboard", resComercio.data.comercio[0]);

      const resProductos = await axiosInstance.get(`/productos/${id}`);
      setProductos(resProductos.data.productos);
      console.log("productos en comercio", resProductos.data.productos); // -------------------------------------

      const pedidoProductoRes = await axiosInstance.get(
        `/pedidos-comercio/${id}`
      );

      setPedidoProductos(pedidoProductoRes.data.pedidos);
      console.log("pedidos en dashboard", pedidoProductoRes.data.pedidos); //---------------------------------------------------

      const categoriasRes = await axiosInstance.get("/categorias");
      console.log("categiruas eb dashboard", categoriasRes);
      setCategorias(categoriasRes.data.categorias);

      calcularStats(pedidoProductoRes.data.pedidos); //---------------------------------------------------
    } catch (error) {
      console.error("Error al obtener datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los datos. Intente nuevamente.",
      });
    }
  };
  useEffect(() => {
    obtenerDatos();
  }, [id]);

  useEffect(() => {
    calcularStats(pedidoProductos);
  }, [pedidoProductos]);

  const handleNuevoProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditarProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoEditar((prev) => ({ ...prev, [name]: value }));
  };

  const abrirEditarProducto = (producto) => {
    setProductoEditar({ ...producto });
    setModalAgregarEditar("editar");
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, precio, url_imagen, id_categoria } =
      nuevoProducto;
    console.log("producto a agregar", nuevoProducto);
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      isNaN(precio) ||
      Number(precio) <= 0 ||
      !url_imagen.trim() ||
      !id_categoria
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Por favor, complete todos los campos correctamente",
      });
      return;
    }

    try {
      setLoading(true);
      const nuevo = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        rating: 0,
        disponible: true,
        id_comercio: id,
        id_categoria,
        url_imagen: url_imagen.trim(),
      };
      console.log("nuevo producto antes de axios", nuevo); //----------------------------------------------
      await axiosInstance.post("/crear/producto", nuevo);
      const { data } = await axiosInstance.get(`/productos/${id}`);
      setProductos(data.productos);
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        url_imagen: "",
        id_categoria: "",
      });
      setModalAgregarEditar(null);
      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al agregar producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  const guardarProductoEditado = async (e) => {
    e.preventDefault();
    const {
      id_producto,
      nombre,
      descripcion,
      precio,
      url_imagen,
      id_categoria,
    } = productoEditar;

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      isNaN(precio) ||
      Number(precio) <= 0 ||
      !url_imagen.trim() ||
      !id_categoria
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Por favor, complete todos los campos correctamente",
      });
      return;
    }

    try {
      setLoading(true);
      const productoActualizado = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        rating: productoEditar.rating || 0,
        disponible: productoEditar.disponible !== false,
        id_comercio: id,
        id_categoria,
        url_imagen: url_imagen.trim(),
      };

      await axiosInstance.put(
        `/producto/${id_producto}/editar`,
        productoActualizado
      );
      const { data } = await axiosInstance.get(`/productos/${id}`);
      setProductos(data.productos);
      setModalAgregarEditar(null);
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al guardar producto editado:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al editar producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (prodId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/producto/${prodId}/eliminar`);
      console.log("respuesta al eliminar", res);
      const { data } = await axiosInstance.get(`/productos/${id}`);
      setProductos(data.productos);
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar producto.",
      });
    }
  };

  return (
    <>
      <HeroComercioPage />
      <Container className="py-4">
        <h2 className="fs-1 mb-1 ">Bienvenido/a {comercio.nombre_admin}</h2>
        <p
          className="fs-5"
          style={{ color: comercio.activo ? "green" : "red" }}
        >
          {comercio.activo ? "Abierto" : "Cerrado"}{" "}
        </p>
        {/* Estadísticas */}
        <Row className="mb-4">
          {[
            {
              title: "Total Pedidos",
              variant: "primary",
              value: stats.totalOrders,
            },
            {
              title: "Pendientes",
              variant: "warning",
              value: stats.pendingOrders,
            },
            {
              title: "Completados",
              variant: "success",
              value: stats.completedOrders,
            },
            {
              title: "Ingresos",
              variant: "info",
              value: `$${pedidoProductos
                .filter((p) => p.estado === "completado")
                .reduce((total, p) => {
                  return (
                    total +
                    p.productos.reduce((acc, prod) => {
                      const pInfo = productos.find(
                        (pp) => pp.id_producto === prod.id_producto
                      );
                      return acc + (pInfo?.precio || 0) * prod.cantidad;
                    }, 0)
                  );
                }, 0)
                .toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
            },
            {
              title: "Total Productos",
              variant: "dark",
              value: productos.length,
            },
          ].map((item, idx) => (
            <Col md={4} key={idx} className="mb-3">
              <Card
                className={`text-center p-2 bg-${item.variant}`}
                style={{ minHeight: "120px" }}
              >
                <Card.Body className="p-2">
                  <Card.Title className="mb-1 fs-5 fw-bold text-light">
                    {item.title}
                  </Card.Title>
                  <h6 className="fs-4">
                    <Badge bg={item.variant}>{item.value}</Badge>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Botones para gestión de productos y pedidos */}
        <Row className="mb-4">
          <Col>
            <Button
              variant="success"
              className="me-2"
              onClick={() => setModalGestionProductos(true)}
            >
              Gestionar Productos
            </Button>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => setModalPedidos(true)}
            >
              Ver Pedidos
            </Button>
            <Button
              variant="dark"
              className="me-2"
              onClick={() => cerrarComercio()}
            >
              {comercio.activo ? "Cerrar comercio" : "Abrir comercio"}
            </Button>
            <Button variant="danger" onClick={() => console.log("hoal")}>
              Salir Sesión
            </Button>
          </Col>
        </Row>

        {/* Modal Gestionar Productos */}
        <Modal
          show={modalGestionProductos}
          onHide={() => setModalGestionProductos(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Gestión de Productos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => setModalAgregarEditar("agregar")}
            >
              Agregar Producto
            </Button>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => {
                  const categoria = categorias.find(
                    (cat) => cat.id_categoria === prod.id_categoria
                  );
                  return (
                    <tr key={prod.id_producto}>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td>
                        {prod?.precio
                          ? "$" + Number(prod.precio).toFixed(2)
                          : "0.00"}
                      </td>
                      <td>{categoria ? categoria.nombre : "N/A"}</td>
                      <td>
                        {prod.url_imagen && (
                          <img
                            src={prod.url_imagen}
                            alt={prod.nombre}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => abrirEditarProducto(prod)}
                          className="me-2 mb-1"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarProducto(prod.id_producto)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>

        {/* Modal Agregar / Editar Producto */}
        <Modal
          show={modalAgregarEditar !== null}
          onHide={() => setModalAgregarEditar(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modalAgregarEditar === "agregar"
                ? "Agregar Producto"
                : "Editar Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={
                modalAgregarEditar === "agregar"
                  ? agregarProducto
                  : guardarProductoEditado
              }
            >
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={
                    modalAgregarEditar === "agregar"
                      ? nuevoProducto.nombre
                      : productoEditar.nombre
                  }
                  onChange={
                    modalAgregarEditar === "agregar"
                      ? handleNuevoProductoChange
                      : handleEditarProductoChange
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={
                    modalAgregarEditar === "agregar"
                      ? nuevoProducto.descripcion
                      : productoEditar.descripcion
                  }
                  onChange={
                    modalAgregarEditar === "agregar"
                      ? handleNuevoProductoChange
                      : handleEditarProductoChange
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  name="precio"
                  value={
                    modalAgregarEditar === "agregar"
                      ? nuevoProducto.precio
                      : productoEditar.precio
                  }
                  onChange={
                    modalAgregarEditar === "agregar"
                      ? handleNuevoProductoChange
                      : handleEditarProductoChange
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="url_imagen">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control
                  type="url"
                  name="url_imagen"
                  value={
                    modalAgregarEditar === "agregar"
                      ? nuevoProducto.url_imagen
                      : productoEditar.url_imagen
                  }
                  onChange={
                    modalAgregarEditar === "agregar"
                      ? handleNuevoProductoChange
                      : handleEditarProductoChange
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="id_categoria"
                  value={
                    modalAgregarEditar === "agregar"
                      ? nuevoProducto.id_categoria
                      : productoEditar.id_categoria
                  }
                  onChange={
                    modalAgregarEditar === "agregar"
                      ? handleNuevoProductoChange
                      : handleEditarProductoChange
                  }
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => setModalAgregarEditar(null)}
                  className="me-2"
                >
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal Pedidos */}
        <Modal
          show={modalPedidos}
          onHide={() => setModalPedidos(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pedidos</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-3 w-100">
            {pedidoProductos.length === 0 ? (
              <p>No hay pedidos.</p>
            ) : (
              pedidoProductos.map((pedido) => {
                const esPendiente = pedido.estado === "pendiente";

                return (
                  <div key={pedido.id_pedido} className="border p-3 mb-4 w-100">
                    <Card.Header className="d-flex justify-content-between align-items-center mb-1">
                      <div>
                        <strong>Pedido #{pedido.id_pedido}</strong> -{" "}
                        <Badge bg={esPendiente ? "warning" : "success"}>
                          {esPendiente ? "Pendiente" : "Listo"}
                        </Badge>
                      </div>
                      {esPendiente && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => updateEstadoPedido(pedido.id_pedido)}
                        >
                          Marcar como Listo
                        </Button>
                      )}
                    </Card.Header>

                    <Card.Body>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pedido.productos.map((producto, index) => (
                            <tr
                              key={`${pedido.id}-${producto.id_producto}-${index}`}
                            >
                              <td>{producto.nombre || "N/A"}</td>
                              <td>{producto.cantidad || "N/A"}</td>
                              <td>${producto.precio || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div className="text-end fw-bold mt-3">
                        Total: $
                        {pedido.productos
                          .reduce(
                            (acc, producto) =>
                              acc + producto.precio * producto.cantidad,
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </Card.Body>
                  </div>
                );
              })
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default VendedorDashboard;
