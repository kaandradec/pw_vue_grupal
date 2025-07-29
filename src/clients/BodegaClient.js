import axios from 'axios';

const URI_API = "http://localhost:8081/api/ventas/v1/bodegas";

const guardarBodega = async (body) => {
    return await axios.post(URI_API, body).then(r => r.data);
};

const consultarBodega = async (id) => {
    return await axios.get(`${URI_API}/${id}`).then(r => r.data);
};

const consultarBodegas = async () => {
    return await axios.get(URI_API).then(r => r.data);
};

const actualizarBodega = async (id, body) => {
    return await axios.put(`${URI_API}/${id}`, body).then(r => r.data);
};

const actualizarParcialBodega = async (id, body) => {
    return await axios.patch(`${URI_API}/${id}`, body).then(r => r.data);
};

const borrarBodega = async (id) => {
    return await axios.delete(`${URI_API}/${id}`).then(r => r.data);
};

export const consultarBodegaFachada = async (id) => {
    return await consultarBodega(id);
};
export const guardarBodegaFachada = async (body) => {
    await guardarBodega(body);
};
export const actualizarBodegaFachada = async (id, body) => {
    await actualizarBodega(id, body);
};
export const actualizarParcialBodegaFachada = async (id, body) => {
    await actualizarParcialBodega(id, body);
};
export const borrarBodegaFachada = async (id) => {
    await borrarBodega(id);
};
export const consultarBodegasFachada = async () => {
    return await consultarBodegas();
};
