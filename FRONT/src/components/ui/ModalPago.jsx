import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

const ModalPago = ({ show, onHide, onConfirm }) => {
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [formData, setFormData] = useState({
    nombre: "",
    numero: "",
    vencimiento: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirm = () => {
    if (metodoPago === "tarjeta") {
      if (
        !formData.nombre ||
        !formData.numero ||
        !formData.vencimiento ||
        !formData.cvv
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completá todos los campos de la tarjeta",
        });
        return;
      }
    }
    onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación de Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Método de Pago</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="switch"
                label="Tarjeta"
                name="metodoPago"
                id="Tarjeta"
                checked={metodoPago === "tarjeta"}
                onChange={() => setMetodoPago("tarjeta")}
              />
              <Form.Check
                type="switch"
                label="Efectivo"
                name="metodoPago"
                id="Efectivo"
                checked={metodoPago === "efectivo"}
                onChange={() => setMetodoPago("efectivo")}
              />
            </div>
          </Form.Group>

          <fieldset disabled={metodoPago === "efectivo"}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Titular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre y Apellido"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Vencimiento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/AA"
                  name="vencimiento"
                  value={formData.vencimiento}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-50">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar Pago
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPago;
