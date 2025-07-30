<template>
  <div class="container">
    <ClienteFormulario @crear-cliente="handleCrearCliente" />

    <hr />


    <ClienteTabla
      :clientes="listaClientes"
      @borrar-cliente="handleBorrarCliente"
      @actualizar-cliente="handleActualizarCliente"
    />
  </div>
</template>

<script>
import ClienteFormulario from "../components/Cliente/ClienteFormulario.vue";
import ClienteTabla from "../components/Cliente/ClienteTabla.vue"

import {
  guardarClienteFachada,
  actualizarParcialClienteFachada,
  borrarClienteFachada,
  consultarClientesFachada,
} from "../clients/ClienteClients.js";

export default {
  components: {
    ClienteFormulario,
    ClienteTabla,
  },
  data() {
    return {
      listaClientes: [],
    };
  },
  async created() {
    await this.consultarTodos();
  },
  methods: {
    async consultarTodos() {
      this.listaClientes = await consultarClientesFachada();
    },

    async handleCrearCliente(clienteCrear) {
  
      await guardarClienteFachada(clienteCrear);
      await this.consultarTodos();
    },

    async handleBorrarCliente(clienteId) {
      await borrarClienteFachada(clienteId);
      await this.consultarTodos();
    },

    async handleActualizarCliente(clienteActualizar) {
      const clienteBody = {
        cedula: clienteActualizar.cedula,
        nombre: clienteActualizar.nombre,
        apellido: clienteActualizar.apellido,
        razonSocial: clienteActualizar.razonSocial,
        direccion: clienteActualizar.direccion,
        telefono: clienteActualizar.telefono,
        email: clienteActualizar.email,
      };
      await actualizarParcialClienteFachada(
        clienteActualizar.id,
        clienteBody
      );
      await this.consultarTodos(); 
    },
  },
};
</script>

<style>
.container {
  padding: 20px;
  max-width: 60%;
  margin: auto;
  font-family: sans-serif;
}
hr {
  
  margin: 2rem 0;
  border: 1px solid #eee;
}
</style>