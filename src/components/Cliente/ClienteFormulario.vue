<template>
  <div class="container">
    <h1>Nuevo Cliente</h1>
    <form @submit.prevent="guardar">
      <label for="cedula-nuevo">Cedula:</label>
      <input
        id="cedula-nuevo"
        v-model="clienteCrear.cedula"
        type="number"
        placeholder="Cedula del cliente"
        required
      />
      <label for="nombre-nuevo">Nombre:</label>
      <input
        id="nombre-nuevo"
        v-model="clienteCrear.nombre"
        type="text"
        placeholder="Nombre del cliente"
        required
      />
      <label for="apellido-nuevo">Apellido:</label>
      <input
        id="apellido-nuevo"
        v-model="clienteCrear.apellido"
        type="text"
        placeholder="Apellido del cliente"
        required
      />
      <label for="razonSocial-nuevo">Razon Social:</label>
      <input
        id="razonSocial-nuevo"
        v-model="clienteCrear.razonSocial"
        type="text"
        placeholder="Razon Social del cliente"
        required
      />
      <label for="direccion-nuevo">Direccion:</label>
      <input
        id="direccion-nuevo"
        v-model="clienteCrear.direccion"
        type="text"
        placeholder="Direccion del cliente"
        required
      />
      <label for="telefono-nuevo">Telefono:</label>
      <input
        id="telefono-nuevo"
        v-model="clienteCrear.telefono"
        type="text"
        placeholder="Telefono del cliente"
        required
      />
      <label for="email-nuevo">Email:</label>
      <input
        id="email-nuevo"
        v-model="clienteCrear.email"
        type="email"
        placeholder="Email del cliente"
        required
      />
      <div class="botones">
        <button type="submit" :disabled="isGuardarDisabled">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["crear-cliente"],
  data() {
    return {
      clienteCrear: {
        cedula: null,
        nombre: null,
        apellido: null,
        razonSocial: null,
        direccion: null,
        telefono: null,
        email: null,
      },
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
      } = this.clienteCrear;
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
    guardar() {
      this.$emit("crear-cliente", this.clienteCrear);
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.clienteCrear = {
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

<style>
.container {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 16px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.botones {
  display: flex;
  gap: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>