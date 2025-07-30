import axios from "axios";

const URI_API = "http://localhost:8081/api/ventas/v1/facturas";
const URI_REPORTES = "http://localhost:8081/api/ventas/v1/reportes";

// Crear factura
const guardarFactura = async (body) => {
    console.log("🛠️ Payload real enviado:", body);
    const data = axios.post(URI_API, body).then(r => r.data);
    return data;
}

// Consultar factura por ID
const consultarFactura = async (id) => {
    const data = axios.get(`${URI_API}/${id}`).then(r => r.data);
    return data;
}

// Consultar todas las facturas
const consultarFacturas = async () => {
    const data = axios.get(URI_API).then(r => r.data);
    return data;
}

// Actualizar factura
const actualizarFactura = async (id, body) => {
    const data = axios.put(`${URI_API}/${id}`, body).then(r => r.data);
    return data;
}

// Eliminar factura
const borrarFactura = async (id) => {
    const data = axios.delete(`${URI_API}/${id}`).then(r => r.data);
    return data;
}

// Buscar factura por número de documento
const buscarFacturaPorNumero = async (numeroDocumento) => {
    const data = axios.get(`${URI_API}/buscar?numeroDocumento=${numeroDocumento}`).then(r => r.data);
    return data;
}

// Obtener reporte de facturas
const obtenerReporteFacturas = async () => {
    const data = axios.get(URI_REPORTES).then(r => r.data);
    return data;
}

const urlC =`http://localhost:8081/api/ventas/v1/clientes/traer`;
// Buscar cliente por cédula
const buscarClientePorCedula = async (cedula) => {
    const data = axios.get(`${urlC}/${cedula}`).then(r => r.data);
    return data;
}

// Buscar producto por código de barras
const urlP =`http://localhost:8081/api/ventas/v1/productos/traer`
const buscarProductoPorCodigoBarras = async (codigoBarras) => {
    const data = axios.get(`${urlP}/${codigoBarras}`).then(r => r.data);
    return data;
}

// Fachadas para exportar
export const guardarFacturaFachada = async (body) => {
    return await guardarFactura(body);
}

export const consultarFacturaFachada = async (id) => {
    return await consultarFactura(id);
}

export const consultarFacturasFachada = async () => {
    return await consultarFacturas();
}

export const actualizarFacturaFachada = async (id, body) => {
    return await actualizarFactura(id, body);
}

export const borrarFacturaFachada = async (id) => {
    return await borrarFactura(id);
}

export const buscarFacturaPorNumeroFachada = async (numeroDocumento) => {
    return await buscarFacturaPorNumero(numeroDocumento);
}

export const obtenerReporteFacturasFachada = async () => {
    return await obtenerReporteFacturas();
}

export const buscarClientePorCedulaFachada = async (cedula) => {
    return await buscarClientePorCedula(cedula);
}

export const buscarProductoPorCodigoBarrasFachada = async (codigoBarras) => {
    return await buscarProductoPorCodigoBarras(codigoBarras);
} 