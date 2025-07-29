<template>
  <div class="container">
    <div class="cuestionario">
      <h1>Nuevo Cliente</h1>
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
    </div>
    <div class="botones">
      <button @click="guardar()" :disabled="isGuardarDisabled">Guardar</button>
    </div>
  </div>
</template>

<script>
import {
  guardarClienteFachada,
    consultarClientesFachada,
} from "../clients/ClienteClients.js";
  export default {
  data() {
    return {
      cliente: {
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      },
      clientes: [],
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
      } = this.cliente;
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
  methods: {

       async consultarTodos() {
      this.clientes = await consultarClientesFachada();
    },
    async guardar() {
      const clienteBody = {
        cedula: this.cliente.cedula,
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        razonSocial: this.cliente.razonSocial,
        direccion: this.cliente.direccion,
        telefono: this.cliente.telefono,
        email: this.cliente.email,
      };
      await guardarClienteFachada(clienteBody);
      this.limpiarFormulario();
      this.consultarTodos();
    },
    limpiarFormulario() {
      this.cliente = {
        id: null,
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      };
    },
  },
};
</script>

<style scoped>
.cuestionario {
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

</style>