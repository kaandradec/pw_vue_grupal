<template>
  <div class="container">
    <h1>Lista Clientes</h1>
    <div class="tabla">
      <table v-if="clientes.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Razon Social</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Accion</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{
              id,
              cedula,
              nombre,
              apellido,
              razonSocial,
              direccion,
              telefono,
              email,
            } in clientes"
            :key="id"
          >
            <td>{{ id }}</td>
            <td>{{ cedula }}</td>
            <td>{{ nombre }}</td>
            <td>{{ apellido }}</td>
            <td>{{ razonSocial }}</td>
            <td>{{ direccion }}</td>
            <td>{{ telefono }}</td>
            <td>{{ email }}</td>
            <td>
              <button @click="borrar(id)">Borrar</button>
            </td>
            <td>
              <button @click="mActualizar(id)">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 v-if="clientes.length === 0">No se encuentran clientes</h1>
    </div>
    <div class="actualizar" v-if="mostrarActualizar">
        <h1>Actualizar Cliente {{ cliente.nombre }}</h1>
      <label for="cedula">Cedula:</label>
      <input
        id="cedula"
        v-model="cliente.cedula"
        type="text"
        placeholder="Cedula del cliente"
      />
      <label for="nombre">Nombre:</label>
      <input
        id="nombre"
        v-model="cliente.nombre"
        type="text"
        placeholder="Nombre del cliente"
      />
      <label for="apellido">Apellido:</label>
      <input
        id="apellido"
        v-model="cliente.apellido"
        type="text"
        placeholder="Apellido del cliente"
      />
      <label for="razonSocial">Razon Social:</label>
      <input
        id="razonSocial"
        v-model="cliente.razonSocial"
        type="text"
        placeholder="Razon Social del cliente"
      />
      <label for="direccion">Direccion:</label>
      <input
        id="direccion"
        v-model="cliente.direccion"
        type="text"
        placeholder="Direccion del cliente"
      />
      <label for="telefono">Telefono:</label>
      <input
        id="telefono"
        v-model="cliente.telefono"
        type="text"
        placeholder="Telefono del cliente"
      />
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="cliente.email"
        type="text"
        placeholder="Email del cliente"
      />
      <button @click="actualizarParcial()">Actualizar</button>
    </div>
  </div>
</template>

<script>
import {
  actualizarParcialClienteFachada,
  borrarClienteFachada,
  consultarClientesFachada,
  consultarClienteFachada,
} from "../clients/ClienteClients.js";
export default {
  data() {
    return {
      cliente: {
        id: null,
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      },
      clientes: [],
      mostrarActualizar: false,
    };
  },
  async created() {
    await this.consultarTodos();
  },
  methods: {
    async consultarTodos() {
      this.clientes = await consultarClientesFachada();
    },
    async mActualizar(id) {
      this.mostrarActualizar = true;
      this.cliente = await consultarClienteFachada(id);
    },
    async actualizarParcial() {
      this.mostrarActualizar = false;
      const clienteAnterior = this.cliente;
      const clienteBody = {
        cedula: this.cliente.cedula || clienteAnterior.cedula,
        nombre: this.cliente.nombre || clienteAnterior.nombre,
        apellido: this.cliente.apellido || clienteAnterior.apellido,
        razonSocial: this.cliente.razonSocial || clienteAnterior.razonSocial,
        direccion: this.cliente.direccion || clienteAnterior.direccion,
        telefono: this.cliente.telefono || clienteAnterior.telefono,
        email: this.cliente.email || clienteAnterior.email,
      };
      await actualizarParcialClienteFachada(this.cliente.id, clienteBody);
      await this.consultarTodos();
    },
    async borrar(Id) {
      await borrarClienteFachada(Id);
      await this.consultarTodos();
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  padding: 16px;
}
.tabla {
  width: 80%;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.actualizar{
  width: 400px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}
button {
  padding: 5px 10px;
  margin: 5px 2px;
  background-color: #007bff;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
input {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #aaa;
  padding: 5px;
  text-align: center;
  box-sizing: border-box;
    text-align: left;

}

.tabla {
border-radius: 12px;
  width: 80%;
  border-collapse: collapse;
  margin-top: 16px;
}

.tabla th, .tabla td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  border-radius: 5px;
}

.tabla th {
  background-color: #f4f4f4;
}

</style>