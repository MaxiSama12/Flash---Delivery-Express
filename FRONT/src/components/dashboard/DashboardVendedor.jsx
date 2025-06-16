import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  Modal,
  Form,
} from 'react-bootstrap';

export default function VendedorDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [productos, setProductos] = useState([]);

  const [modalActivo, setModalActivo] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
  });

  // Para edición inline
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({
    nombre: '',
    precio: '',
    stock: '',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const resPedidos = await axios.get('http://localhost:3001/pedidos');
      const resProductos = await axios.get('http://localhost:3001/productos');

      setRecentOrders(resPedidos.data);
      setProductos(resProductos.data);

      actualizarStats(resPedidos.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const actualizarStats = (pedidos) => {
    const total = pedidos.length;
    const pendientes = pedidos.filter((p) => p.status === 'pendiente').length;
    const completados = pedidos.filter((p) => p.status === 'completado').length;
    const ganancias = pedidos
      .filter((p) => p.status === 'completado')
      .reduce((suma, p) => suma + p.total, 0);

    setStats({
      totalOrders: total,
      pendingOrders: pendientes,
      completedOrders: completados,
      totalEarnings: ganancias,
    });
  };

  const marcarComoCompletado = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/pedidos/${id}`, {
        status: 'completado',
      });

      const pedidosActualizados = recentOrders.map((pedido) =>
        pedido.id === id ? { ...pedido, status: 'completado' } : pedido
      );

      setRecentOrders(pedidosActualizados);
      actualizarStats(pedidosActualizados);
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
    }
  };

  const handleNuevoProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (
      !nuevoProducto.nombre ||
      !nuevoProducto.precio ||
      !nuevoProducto.stock
    ) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const nuevo = {
        nombre: nuevoProducto.nombre,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
      };
      const res = await axios.post('http://localhost:3001/productos', nuevo);
      setProductos((prev) => [...prev, res.data]);
      setNuevoProducto({ nombre: '', precio: '', stock: '' });
      setModalActivo(null);
    } catch (error) {
      console.error('Error agregando producto:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      setProductos(productos.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  // Edición inline
  const iniciarEdicion = (producto) => {
    setEditandoProductoId(producto.id);
    setProductoEditado({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  const handleCambioEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const guardarEdicion = async () => {
    try {
      await axios.patch(`http://localhost:3001/productos/${editandoProductoId}`, {
        nombre: productoEditado.nombre,
        precio: Number(productoEditado.precio),
        stock: Number(productoEditado.stock),
      });
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === editandoProductoId
            ? {
                ...prod,
                nombre: productoEditado.nombre,
                precio: Number(productoEditado.precio),
                stock: Number(productoEditado.stock),
              }
            : prod
        )
      );
      setEditandoProductoId(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const cancelarEdicion = () => {
    setEditandoProductoId(null);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-success">¡Bienvenido al Panel del Vendedor!</h2>

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
                <Badge bg="info">${stats.totalEarnings}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Acciones rápidas */}
      <h4 className="mb-3">Acciones rápidas</h4>
      <Row className="mb-4">
        <Col>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => setModalActivo('agregar')}
          >
            Agregar producto
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => setModalActivo('verPedidos')}
          >
            Ver pedidos
          </Button>
        </Col>
        <Col>
          <Button
            variant="warning"
            className="w-100"
            onClick={() => setModalActivo('gestionarProductos')}
          >
            Gestionar productos
          </Button>
        </Col>
      </Row>

      {/* Modal Agregar Producto */}
      <Modal show={modalActivo === 'agregar'} onHide={() => setModalActivo(null)}>
        <Form onSubmit={agregarProducto}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleNuevoProductoChange}
                placeholder="Nombre del producto"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleNuevoProductoChange}
                placeholder="Precio"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={nuevoProducto.stock}
                onChange={handleNuevoProductoChange}
                placeholder="Stock"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalActivo(null)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Agregar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Ver Pedidos */}
      <Modal show={modalActivo === 'verPedidos'} onHide={() => setModalActivo(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Todos los Pedidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {recentOrders.length === 0 ? (
            <p>No hay pedidos</p>
          ) : (
            <ListGroup>
              {recentOrders.map((order) => (
                <ListGroup.Item key={order.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Pedido #{order.id}</strong> - Cliente: {order.cliente}
                      <br />
                      Total: ${order.total} - Estado:{' '}
                      <Badge bg={order.status === 'pendiente' ? 'danger' : 'success'}>
                        {order.status}
                      </Badge>
                    </div>
                    {order.status === 'pendiente' && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => marcarComoCompletado(order.id)}
                      >
                        Marcar como completado
                      </Button>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalActivo(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Gestionar Productos */}
      <Modal show={modalActivo === 'gestionarProductos'} onHide={() => setModalActivo(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productos.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            <ListGroup>
              {productos.map((prod) => (
                <ListGroup.Item
                  key={prod.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {editandoProductoId === prod.id ? (
                    <div className="flex-grow-1 me-3">
                      <input
                        type="text"
                        name="nombre"
                        value={productoEditado.nombre}
                        onChange={handleCambioEdicion}
                        className="form-control mb-2"
                        placeholder="Nombre"
                      />
                      <input
                        type="number"
                        name="precio"
                        value={productoEditado.precio}
                        onChange={handleCambioEdicion}
                        className="form-control mb-2"
                        placeholder="Precio"
                      />
                      <input
                        type="number"
                        name="stock"
                        value={productoEditado.stock}
                        onChange={handleCambioEdicion}
                        className="form-control mb-2"
                        placeholder="Stock"
                      />
                    </div>
                  ) : (
                    <div>
                      <strong>{prod.nombre}</strong> - Precio: ${prod.precio} - Stock: {prod.stock}
                    </div>
                  )}

                  <div>
                    {editandoProductoId === prod.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={guardarEdicion}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={cancelarEdicion}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => iniciarEdicion(prod)}
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
                      </>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalActivo(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
}