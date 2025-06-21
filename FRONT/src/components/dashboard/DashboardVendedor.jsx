import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Importado SweetAlert2
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
    const totalEarnings = listaPedidoProductos
      .filter((p) => p.estado === "completado")
      .reduce((sum, p) => sum + p.total, 0);

    setStats({ totalOrders, pendingOrders, completedOrders, totalEarnings });
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const comercioRes = await axios.get(
          `http://localhost:3000/comercios/${id}`
        );
        setComercio(comercioRes.data);

        const productosRes = await axios.get("http://localhost:3000/productos");
        const productosFiltrados = productosRes.data.filter(
          (prod) => String(prod.id_comercio) === String(id)
        );
        setProductos(productosFiltrados);

        const pedidoProductoRes = await axios.get(
          "http://localhost:3000/pedidos"
        );

        setPedidoProductos(
          pedidoProductoRes.data.filter(
            (ped) => String(ped.id_comercio) === String(id)
          )
        );

        const categoriasRes = await axios.get(
          "http://localhost:3000/categorias"
        );
        setCategorias(categoriasRes.data);

        calcularStats(pedidoProductoRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al cargar los datos. Intente nuevamente.",
        });
      }
    };

    if (id) {
      obtenerDatos();
    }
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

      const res = await axios.post("http://localhost:3000/productos", nuevo);
      setProductos((prev) => [...prev, res.data]);
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
      id: prodId,
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

      await axios.put(
        `http://localhost:3000/productos/${prodId}`,
        productoActualizado
      );
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === prodId ? { ...prod, ...productoActualizado } : prod
        )
      );
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
      await axios.delete(`http://localhost:3000/productos/${prodId}`);
      setProductos((prev) => prev.filter((prod) => prod.id !== prodId));
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

  const cambiarEstadoPedido = async (pedidoProductoId, estadoActual) => {
    if (estadoActual === "completado") return;

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/pedidos/${pedidoProductoId}`,
        {
          estado: "completado",
        }
      );

      setPedidoProductos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoProductoId
            ? { ...pedido, estado: "completado" }
            : pedido
        )
      );
      Swal.fire({
        icon: "success",
        title: "Pedido marcado como completado",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al cambiar estado del pedido:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado del pedido.",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(comercio)
  
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-success">Panel de {comercio.nombre}</h2>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Pedidos</Card.Title>
              <h4>
                <Badge bg="primary">{stats.totalOrders}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pendientes</Card.Title>
              <h4>
                <Badge bg="warning">{stats.pendingOrders}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Completados</Card.Title>
              <h4>
                <Badge bg="success">{stats.completedOrders}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ingresos</Card.Title>
              <h4>
                <Badge bg="info">
                  $
                  {pedidoProductos
                    .filter((pedido) => pedido.estado === "completado")
                    .reduce((total, pedido) => {
                      return (
                        total +
                        pedido.productos.reduce((acc, producto) => {
                          const prod = productos.find(
                            (p) => String(p.id) === String(producto.id_producto)
                          );
                          const precioUnitario = prod?.precio || 0;
                          return acc + precioUnitario * producto.cantidad;
                        }, 0)
                      );
                    }, 0)
                    .toFixed(2)}
                </Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Nueva fila de estadísticas: Total Categorías y Total Productos */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Productos</Card.Title>
              <h4>
                <Badge bg="dark">{productos.length}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Botones para gestión de productos y pedidos */}
      <Row className="mb-4">
        <Col>
          <Button
            variant="success"
            onClick={() => setModalGestionProductos(true)}
          >
            Gestionar Productos
          </Button>{" "}
          <Button variant="info" onClick={() => setModalPedidos(true)}>
            Ver Pedidos
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
                  (cat) => cat.id === prod.id_categoria
                );
                return (
                  <tr key={prod.id}>
                    <td>{prod.nombre}</td>
                    <td>{prod.descripcion}</td>
                    <td>${prod.precio.toFixed(2)}</td>
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
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarProducto(prod.id)}
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
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre_categoria}
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
        <Modal.Body>
          {pedidoProductos.length === 0 ? (
            <p>No hay pedidos.</p>
          ) : (
            pedidoProductos.map((pedido) => {
              const esPendiente = pedido.estado === "pendiente";

              return (
                <Card key={pedido.id} className="mb-4">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Pedido #{pedido.id}</strong> -{" "}
                      <Badge bg={esPendiente ? "warning" : "success"}>
                        {esPendiente ? "Pendiente" : "Listo"}
                      </Badge>
                    </div>
                    {esPendiente && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          cambiarEstadoPedido(pedido.id, pedido.estado)
                        }
                      >
                        Marcar como Listo
                      </Button>
                    )}
                  </Card.Header>

                  <Card.Body>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      style={{ width: "400px" }}
                    >
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map((producto, index) => {
                          const prod = productos.find(
                            (p) => String(p.id) === String(producto.id_producto)
                          );
                          const precioUnitario = prod?.precio || 0;
                          return (
                            <tr
                              key={`${pedido.id}-${producto.id_producto}-${index}`}
                            >
                              <td>{prod ? prod.nombre : "N/A"}</td>
                              <td>{producto.cantidad}</td>
                              <td>${precioUnitario.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>

                    {/* Mostrar total debajo de la tabla */}
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Total: $
                      {pedido.productos
                        .reduce((acc, producto) => {
                          const prod = productos.find(
                            (p) => String(p.id) === String(producto.id_producto)
                          );
                          const precioUnitario = prod?.precio || 0;
                          return acc + precioUnitario * producto.cantidad;
                        }, 0)
                        .toFixed(2)}
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VendedorDashboard;
