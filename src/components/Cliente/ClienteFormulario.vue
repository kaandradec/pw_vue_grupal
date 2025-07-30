<template>
  <div class="container">
    <h1>Nuevo Cliente</h1>
    <form @submit.prevent="guardar">
      <label for="cedula-nuevo">Cedula:</label>
      <input
        id="cedula-nuevo"
        v-model="clienteCrear.cedula"
        @input="validarCedula"
        type="text"
        placeholder="Cedula del cliente"
        required
        maxlength="10"
      />
      <span v-if="cedulaError" class="error-message">{{ cedulaError }}</span>

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
  props: {
    clientesExistentes: {
      type: Array,
      required: true,
    },
  },
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
      cedulaError: null,
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
        !email ||
        !!this.cedulaError
      );
    },
  },
  methods: {
    validarCedula() {
      const cedula = this.clienteCrear.cedula;
      if (!/^\d+$/.test(cedula)) {
        this.cedulaError = "La cédula solo debe contener números.";
        return;
      }
      if (cedula.length !== 10) {
        this.cedulaError = "La cédula debe tener exactamente 10 dígitos.";
        return;
      }

      if (
        this.clientesExistentes.some((cliente) => cliente.cedula === cedula)
      ) {
        this.cedulaError = "Esta cédula ya se encuentra registrada.";
        return;
      }

      this.cedulaError = null;
    },
    guardar() {
      this.validarCedula();
      if (this.cedulaError) {
        return;
      }
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
      this.cedulaError = null;
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
.error-message {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: -5px;
  margin-bottom: 10px;
} /* Añadido para que el span se vea bien */
</style>