<template>
  <div>
    <div class="container">
      <h1>Lista de Clientes</h1>
      <table v-if="clientes.length > 0">
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
          <tr v-for="cliente in clientes" :key="cliente.id">
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
      <h1 v-if="clientes.length === 0">No se encuentran clientes</h1>
    </div>

    <div class="formulario-container" v-if="mostrarActualizar">
      <h1>Actualizar Cliente: {{ clienteActualizar.nombre }}</h1>
      <label for="cedula-actualizar">Cedula:</label>
      <input
        id="cedula-actualizar"
        v-model="clienteActualizar.cedula"
        type="number"
        placeholder="Cedula del cliente"
      />
       <label for="nombre-actualizar">Nombre:</label>
      <input
        id="nombre-actualizar"
        v-model="clienteActualizar.nombre"
        type="text"
        placeholder="Nombre del cliente"
      />

      <label for="apellido-actualizar">Apellido:</label>
      <input
        id="apellido-actualizar"
        v-model="clienteActualizar.apellido"
        type="text"
        placeholder="Apellido del cliente"
      />

      <label for="razonSocial-actualizar">Razon Social:</label>
      <input
        id="razonSocial-actualizar"
        v-model="clienteActualizar.razonSocial"
        type="text"
        placeholder="Razon Social del cliente"
      />

      <label for="direccion-actualizar">Direccion:</label>
      <input
        id="direccion-actualizar"
        v-model="clienteActualizar.direccion"
        type="text"
        placeholder="Direccion del cliente"
      />

      <label for="telefono-actualizar">Telefono:</label>
      <input
        id="telefono-actualizar"
        v-model="clienteActualizar.telefono"
        type="text"
        placeholder="Telefono del cliente"
      />

      <label for="email-actualizar">Email:</label>
      <input
        id="email-actualizar"
        v-model="clienteActualizar.email"
        type="text"
        placeholder="Email del cliente"
      />

      <button @click="actualizarParcial()">Actualizar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clientes: {
      type: Array,
      required: true,
    },
  },
  emits: ["borrar-cliente", "actualizar-cliente"], 
  data() {
    return {
      clienteActualizar: {
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
  methods: {
    mActualizar(cliente) {
      this.clienteActualizar = { ...cliente }; 
      this.mostrarActualizar = true;
    },
    actualizarParcial() {
      this.mostrarActualizar = false;
      this.$emit("actualizar-cliente", this.clienteActualizar);
    },
    borrar(id) {
      this.$emit("borrar-cliente", id);
    },
  },
};
</script>

<style >

.formulario-container,
.tabla-container {
  
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
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
</style>