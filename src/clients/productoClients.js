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
//DELETE --public void eliminarPorId(@PathParam("id") Integer id) {
const EProducto = async (id) => {
  axios
    .delete(`http://localhost:8081/api/ventas/v1/productos/${id}`)
    .then((r) => r.data);
};
export const EProductoFachada = async (id) => {
  await EProducto(id);
};
