import axios from "axios";

const URI_API = "http://localhost:8081/api/ventas/v1/clientes";

const guardarCliente = async (body) => {
   return await axios.post(URI_API, body).then(r => r.data);
}

const consultarCliente = async (id) => {
    const data = axios.get(`${URI_API}/${id}`).then(r => r.data);
    return await data;
}

const consultarClientes = async () => {
    const respuesta =axios.get(URI_API).then(r => r.data);
    return await respuesta;
}

const actualizarCliente = async (id, body) => {
     return await axios.put(`${URI_API}/${id}`, body).then(r => r.data);
}

const actualizarParcialCliente = async (id, body) => {
    return await axios.patch(`${URI_API}/${id}`, body).then(r => r.data);
}

const borrarCliente = async (id) => {
    return await axios.delete(`${URI_API}/${id}`).then(r => r.data);
}

export const consultarClienteFachada = async (id) => {
    return await consultarCliente(id)
}
export const guardarClienteFachada = async (body) => {
    await guardarCliente(body)
}
export const actualizarClienteFachada = async (id, body) => {
    await actualizarCliente(id, body)
}
export const actualizarParcialClienteFachada = async (id, body) => {
    await actualizarParcialCliente(id, body)
}
export const borrarClienteFachada = async (id) => {
    await borrarCliente(id)
}
export const consultarClientesFachada = async () => {
    return await consultarClientes()
}