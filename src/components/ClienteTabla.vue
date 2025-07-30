<template>
  <div class="container">
    <div class="formulario-container">
      <h1>Nuevo Cliente</h1>
      <form @submit.prevent="guardar">
        <label for="cedula-nuevo">Cedula:</label>
        <input
          id="cedula-nuevo"
          v-model="clienteParaCrear.cedula"
          type="text"
          placeholder="Cedula del cliente"
          required
        />

        <label for="nombre-nuevo">Nombre:</label>
        <input
          id="nombre-nuevo"
          v-model="clienteParaCrear.nombre"
          type="text"
          placeholder="Nombre del cliente"
          required
        />

        <label for="apellido-nuevo">Apellido:</label>
        <input
          id="apellido-nuevo"
          v-model="clienteParaCrear.apellido"
          type="text"
          placeholder="Apellido del cliente"
          required
        />

        <label for="razonSocial-nuevo">Razon Social:</label>
        <input
          id="razonSocial-nuevo"
          v-model="clienteParaCrear.razonSocial"
          type="text"
          placeholder="Razon Social del cliente"
          required
        />

        <label for="direccion-nuevo">Direccion:</label>
        <input
          id="direccion-nuevo"
          v-model="clienteParaCrear.direccion"
          type="text"
          placeholder="Direccion del cliente"
          required
        />

        <label for="telefono-nuevo">Telefono:</label>
        <input
          id="telefono-nuevo"
          v-model="clienteParaCrear.telefono"
          type="text"
          placeholder="Telefono del cliente"
          required
        />

        <label for="email-nuevo">Email:</label>
        <input
          id="email-nuevo"
          v-model="clienteParaCrear.email"
          type="email"
          placeholder="Email del cliente"
          required
        />

        <div class="botones">
          <button type="submit" :disabled="isGuardarDisabled">Guardar</button>
        </div>
      </form>
    </div>

    <hr />
    <div class="tabla-container">
      <h1>Lista de Clientes</h1>
      <table v-if="listaClientes.length > 0">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in listaClientes" :key="cliente.id">
            <td>{{ cliente.cedula }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.direccion }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button @click="borrar(cliente.id)">Borrar</button>
              <button @click="mActualizar(cliente)">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 v-if="listaClientes.length === 0">No se encuentran clientes</h1>
    </div>

    <div class="formulario-container" v-if="mostrarActualizar">
      <h1>Actualizar Cliente: {{ clienteParaActualizar.nombre }}</h1>
      <label for="cedula-actualizar">Cedula:</label>
      <input
        id="cedula-actualizar"
        v-model="clienteParaActualizar.cedula"
        type="text"
        placeholder="Cedula del cliente"
      />

      <label for="nombre-actualizar">Nombre:</label>
      <input
        id="nombre-actualizar"
        v-model="clienteParaActualizar.nombre"
        type="text"
        placeholder="Nombre del cliente"
      />

      <label for="apellido-actualizar">Apellido:</label>
      <input
        id="apellido-actualizar"
        v-model="clienteParaActualizar.apellido"
        type="text"
        placeholder="Apellido del cliente"
      />

      <label for="razonSocial-actualizar">Razon Social:</label>
      <input
        id="razonSocial-actualizar"
        v-model="clienteParaActualizar.razonSocial"
        type="text"
        placeholder="Razon Social del cliente"
      />

      <label for="direccion-actualizar">Direccion:</label>
      <input
        id="direccion-actualizar"
        v-model="clienteParaActualizar.direccion"
        type="text"
        placeholder="Direccion del cliente"
      />

      <label for="telefono-actualizar">Telefono:</label>
      <input
        id="telefono-actualizar"
        v-model="clienteParaActualizar.telefono"
        type="text"
        placeholder="Telefono del cliente"
      />

      <label for="email-actualizar">Email:</label>
      <input
        id="email-actualizar"
        v-model="clienteParaActualizar.email"
        type="text"
        placeholder="Email del cliente"
      />

      <button @click="actualizarParcial()">Actualizar</button>
    </div>
  </div>
</template>

<script>
import {
  guardarClienteFachada,
  actualizarParcialClienteFachada,
  borrarClienteFachada,
  consultarClientesFachada,
} from "../clients/ClienteClients.js";

export default {
  data() {
    return {
      clienteParaCrear: {
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      },
      listaClientes: [],
      clienteParaActualizar: {
        id: null,
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      },
      mostrarActualizar: false,
    };
  },
  computed: {
    isGuardarDisabled() {
      const {
        cedula,
        nombre,
        apellido,
        razonSocial,
        direccion,
        telefono,
        email,
      } = this.clienteParaCrear;
      return (
        !cedula ||
        !nombre ||
        !apellido ||
        !razonSocial ||
        !direccion ||
        !telefono ||
        !email
      );
    },
  },
  async created() {
    await this.consultarTodos();
  },
  methods: {
    async guardar() {
      await guardarClienteFachada(this.clienteParaCrear);
      this.limpiarFormulario();
      await this.consultarTodos();
    },
    limpiarFormulario() {
      this.clienteParaCrear = {
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      };
    },

    async consultarTodos() {
      this.listaClientes = await consultarClientesFachada();
    },
    mActualizar(cliente) {
      this.clienteParaActualizar = { ...cliente };
      this.mostrarActualizar = true;
    },
    async actualizarParcial() {
      this.mostrarActualizar = false;
      const clienteBody = {
        cedula: this.clienteParaActualizar.cedula,
        nombre: this.clienteParaActualizar.nombre,
        apellido: this.clienteParaActualizar.apellido,
        razonSocial: this.clienteParaActualizar.razonSocial,
        direccion: this.clienteParaActualizar.direccion,
        telefono: this.clienteParaActualizar.telefono,
        email: this.clienteParaActualizar.email,
      };
      await actualizarParcialClienteFachada(
        this.clienteParaActualizar.id,
        clienteBody
      );
      await this.consultarTodos();
    },
    async borrar(id) {
      await borrarClienteFachada(id);
      await this.consultarTodos();
    },
  },
};
</script>

<style scoped>
.container {
  padding: 16px;
  max-width: 1200px;
  margin: auto;
  font-family: sans-serif;
}
hr {
  margin: 2rem 0;
  border: 1px solid #eee;
}
.formulario-container,
.tabla-container {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.botones {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button[type="button"] {
  background-color: #6c757d;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
table th,
table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
table th {
  background-color: #f2f2f2;
}
h1 {
  margin-top: 0;
}
</style>