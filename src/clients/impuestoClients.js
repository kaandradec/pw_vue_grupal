import axios from "axios";

// GET -- Obtener un impuesto por ID
const consultarImpuesto = async (id) => {
  return axios
    .get(`http://localhost:8081/api/ventas/v1/impuestos/${id}`)
    .then((r) => r.data);
};
export const C_ImpuestoFachada = async (id) => {
  return await consultarImpuesto(id);
};

// GET -- Listar todos los impuestos
const listarImpuestos = async () => {
  return axios
    .get(`http://localhost:8081/api/ventas/v1/impuestos`)
    .then((r) => r.data);
};
export const L_ImpuestosFachada = async () => {
  return await listarImpuestos();
};

// POST -- Guardar un nuevo impuesto
const G_Impuesto = async (body) => {
  return axios
    .post(`http://localhost:8081/api/ventas/v1/impuestos`, body)
    .then((r) => r.data);
};
export const G_ImpuestoFachada = async (body) => {
  return await G_Impuesto(body);
};

// PUT -- Actualizar un impuesto por ID
const AImpuesto = async (id, body) => {
  return axios
    .put(`http://localhost:8081/api/ventas/v1/impuestos/${id}`, body)
    .then((r) => r.data);
};
export const A_ImpuestoFachada = async (id, body) => {
  return await AImpuesto(id, body);
};

// DELETE -- Eliminar un impuesto por ID
const EImpuesto = async (id) => {
  axios
    .delete(`http://localhost:8081/api/ventas/v1/impuestos/${id}`)
    .then((r) => r.data);
};
export const EImpuestoFachada = async (id) => {
  await EImpuesto(id);
};
