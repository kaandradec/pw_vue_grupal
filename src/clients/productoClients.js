import axios from "axios";

//GET -- public Response consultarPorId(@PathParam("id") Integer id) {
const consultarProducto = async (id) => {
  return axios
    .get(`http://localhost:8081/api/ventas/v1/productos/${id}`)
    .then((r) => r.data);
};
export const C_ProductoFachada = async (id) => {
  return await consultarProducto(id);
};
// GET -- public Response listarTodos()
const listarProductos = async () => {
  return axios
    .get(`http://localhost:8081/api/ventas/v1/productos`)
    .then((r) => r.data);
};
export const L_ProductosFachada = async () => {
  return await listarProductos();
};
//POST -- public void guardar(@RequestBody ProductoTo productoTo) {
const G_Producto = async (body) => {
  return axios
    .post(`http://localhost:8081/api/ventas/v1/productos`, body)
    .then((r) => r.data);
};
export const G_ProductoFachada = async (body) => {
  return await G_Producto(body);
};
//PUT -- public void actualizarPorId(@RequestBody ProductoTo productoTo, @PathParam("id") Integer id) {
const AProducto = async (id, body) => {
  return axios
    .put(`http://localhost:8081/api/ventas/v1/productos/${id}`, body)
    .then((r) => r.data);
};
export const A_ProductoFachada = async (id, body) => {
  return await AProducto(id, body);
};
// PATCH -- actualización parcial de producto
const patchProducto = async (id, body) => {
  return axios
    .patch(`http://localhost:8081/api/ventas/v1/productos/${id}`, body)
    .then((r) => r.data);
};

export const Patch_ProductoFachada = async (id, body) => {
  return await patchProducto(id, body);
};

//DELETE --public void eliminarPorId(@PathParam("id") Integer id) {
const EProducto = async (id) => {
  axios
    .delete(`http://localhost:8081/api/ventas/v1/productos/${id}`)
    .then((r) => r.data);
};
export const EProductoFachada = async (id) => {
  await EProducto(id);
};

//BUSQUEDA POR CODIGO DE BARRA ------------>
//GET -- public Response buscarProductoCompleto(@QueryParam("codigoBarras") String codigoBarras) {

//http://localhost:8081/api/ventas/v1/productos/buscar?codigoBarras=123
const buscarPorCodigoBarras = async (codigoBarras) => {
  return axios
    .get(
      `http://localhost:8081/api/ventas/v1/productos/buscar?codigoBarras=${codigoBarras}`
    )
    .then((r) => r.data);
};
export const BuscarPorCodigoBarrasFachada = async (codigoBarras) => {
  return await buscarPorCodigoBarras(codigoBarras);
};

//GET -- public Response consultarProductoCompleto(@PathParam("id") Integer id) {

//http://localhost:8081/api/ventas/v1/productos/1/completo
const consultarProductoCompleto = async (id) => {
  return axios
    .get(`http://localhost:8081/api/ventas/v1/productos/${id}/completo`)
    .then((r) => r.data);
};
export const C_ProductoCompletoFachada = async (id) => {
  return await consultarProductoCompleto(id);
};

/*
 	INSERT INTO impuesto (impu_codigo, impu_nombre, impu_porcentaje)
VALUES ('111', 'ICE', 10.00);

INSERT INTO impuesto (impu_codigo, impu_nombre, impu_porcentaje)
VALUES ('222', 'ISD', 5.00);

	INSERT INTO impuesto (impu_codigo, impu_nombre, impu_porcentaje)
VALUES ('333', 'IVA', 30.00);

	INSERT INTO impuesto (impu_codigo, impu_nombre, impu_porcentaje)
VALUES ('4444', 'NONE', 00.00);
 */
