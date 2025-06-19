import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [comercio, setComercio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [pedidoProductos, setPedidoProductos] = useState([]);
  const [modalGestionProductos, setModalGestionProductos] = useState(false);
  const [modalAgregarEditar, setModalAgregarEditar] = useState(null); // 'agregar' | 'editar' | null
  const [modalPedidos, setModalPedidos] = useState(false);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });

  // Estado para categorías
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






  // Función para calcular estadísticas con pedido_producto
  const calcularStats = (listaPedidoProductos) => {
    // Suponiendo que cada pedido_producto tiene un estado status, total y cantidad
    const totalOrders = listaPedidoProductos.length;
    const pendingOrders = listaPedidoProductos.filter(
      (p) => p.status === "pendiente"
    ).length;
    const completedOrders = listaPedidoProductos.filter(
      (p) => p.status === "completado"
    ).length;
    const totalEarnings = listaPedidoProductos
      .filter((p) => p.status === "completado")
      .reduce((sum, p) => sum + p.total, 0);

    setStats({ totalOrders, pendingOrders, completedOrders, totalEarnings });
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const comercioRes = await axios.get(`http://localhost:3000/clientes/${id}`);
        setComercio(comercioRes.data);

        const productosRes = await axios.get("http://localhost:3000/productos");
        const productosFiltrados = productosRes.data.filter(
          (prod) => String(prod.id_comercio) === String(id)
        );
        setProductos(productosFiltrados);

        const pedidoProductoRes = await axios.get(
          "http://localhost:3000/pedido_producto"
        );
        setPedidoProductos(pedidoProductoRes.data);

        const categoriasRes = await axios.get(
          "http://localhost:3000/categorias"
        );
        setCategorias(categoriasRes.data);

        calcularStats(pedidoProductoRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        alert("Error al cargar los datos. Intente nuevamente.");
      }
    };

    if (id) {
      obtenerDatos();
    }
  }, [id]);



  // Actualizar estadísticas cuando cambian pedidoProductos
  useEffect(() => {
    calcularStats(pedidoProductos);
  }, [pedidoProductos]);

  // Formularios para productos siguen igual
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

  // Agregar producto (sin cambios)
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
      alert("Por favor, complete todos los campos correctamente");
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
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto.");
    } finally {
      setLoading(false);
    }
  };

  // Guardar producto editado (sin cambios)
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
      alert("Por favor, complete todos los campos correctamente");
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
    } catch (error) {
      console.error("Error al guardar producto editado:", error);
      alert("Error al editar producto.");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto (sin cambios)
  const eliminarProducto = async (prodId) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este producto?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/productos/${prodId}`);
      setProductos((prev) => prev.filter((prod) => prod.id !== prodId));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar producto.");
    }
  };

  // Cambiar estado de pedido_producto de pendiente a completado
  const cambiarEstadoPedido = async (pedidoProductoId, estadoActual) => {
    if (estadoActual === "completado") return;

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/pedido_producto/${pedidoProductoId}`,
        { status: "completado" }
      );

      setPedidoProductos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoProductoId
            ? { ...pedido, status: "completado" }
            : pedido
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado del pedido:", error);
      alert("No se pudo cambiar el estado del pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (!comercio) {
    return <div className="text-center py-5">Cargando comercio...</div>;
  }

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
                    .reduce((total, pedido) => {
                      const prod = productos.find(
                        (p) => p.id === pedido.id_producto
                      );
                      return total + (prod?.precio || 0) * pedido.cantidad;
                    }, 0)
                    .toFixed(2)}
                </Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Botones para abrir modales */}
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

      {/* Modal Gestion Productos */}
      <Modal
        show={modalGestionProductos}
        onHide={() => {
          setModalGestionProductos(false);
          setModalAgregarEditar(null);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => setModalAgregarEditar("agregar")}
          >
            Agregar Producto
          </Button>

          {productos.length === 0 ? (
            <p>No hay productos aún para este comercio.</p>
          ) : (
            <Row>
              {productos.map((producto) => (
                <Col md={6} lg={4} key={producto.id} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={
                        producto.url_imagen || "https://via.placeholder.com/150"
                      }
                      alt={`Imagen de ${producto.nombre}`}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text>{producto.descripcion}</Card.Text>
                      <Card.Text>Precio: ${producto.precio}</Card.Text>
                      <Card.Text>Rating: {producto.rating || 0}</Card.Text>
                      <Card.Text>
                        Categoría:{" "}
                        {categorias.find(
                          (cat) => cat.id === producto.id_categoria
                        )?.nombre_categoria || "Sin categoría"}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => abrirEditarProducto(producto)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => eliminarProducto(producto.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal Agregar/Editar Producto */}
      <Modal
        show={
          modalAgregarEditar === "agregar" || modalAgregarEditar === "editar"
        }
        onHide={() => setModalAgregarEditar(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAgregarEditar === "agregar"
              ? "Agregar Producto"
              : "Editar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={
            modalAgregarEditar === "agregar"
              ? agregarProducto
              : guardarProductoEditado
          }
        >
          <Modal.Body>
            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                min="0"
                step="0.01"
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

            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalAgregarEditar(null)}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Pedidos */}
      <Modal
        show={modalPedidos}
        onHide={() => setModalPedidos(false)}
        size="lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Pedidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoProductos.length === 0 ? (
            <p>No hay pedidos aún.</p>
          ) : (
            pedidoProductos
              .reduce((acc, pedido) => {
                const existing = acc.find(
                  (p) => p.id_pedido === pedido.id_pedido
                );
                if (existing) {
                  existing.items.push(pedido);
                } else {
                  acc.push({
                    id_pedido: pedido.id_pedido,
                    comprador: pedido.nombre_comprador || "N/A",
                    status: pedido.status,
                    total: pedido.total_pedido,
                    items: [pedido],
                  });
                }
                return acc;
              }, [])
              .map((pedidoGroup) => (
                <Card key={pedidoGroup.id_pedido} className="mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Pedido #{pedidoGroup.id_pedido}</strong> -{" "}
                      <span>Comprador: {pedidoGroup.comprador}</span>
                    </div>
                    <Badge
                      bg={
                        pedidoGroup.status === "pendiente"
                          ? "warning"
                          : "success"
                      }
                    >
                      {pedidoGroup.status}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Table bordered size="sm" className="mb-3">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidoGroup.items.map((item) => {
                          const prod = productos.find(
                            (p) => p.id === item.id_producto
                          );
                          const totalCalculado =
                            (prod?.precio || 0) * item.cantidad;
                          return (
                            <tr key={item.id}>
                              <td>{prod?.nombre || "Producto eliminado"}</td>
                              <td>{item.cantidad}</td>
                              <td>${totalCalculado.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>
                          Total Compra: $
                          {pedidoGroup.items
                            .reduce((sum, item) => {
                              const prod = productos.find(
                                (p) => p.id === item.id_producto
                              );
                              return sum + (prod?.precio || 0) * item.cantidad;
                            }, 0)
                            .toFixed(2)}
                        </strong>
                      </div>
                      {pedidoGroup.status === "pendiente" && (
                        <Button
                          variant="success"
                          onClick={() => {
                            const ids = pedidoGroup.items.map((p) => p.id);
                            ids.forEach((id) =>
                              cambiarEstadoPedido(id, "pendiente")
                            );
                          }}
                          disabled={loading}
                        >
                          Listo
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VendedorDashboard;
