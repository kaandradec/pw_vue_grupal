<template>
  <div class="container">
    <div class="cuestionario">
      <label for="id">ID:</label>
      <input
        id="id"
        v-model="cliente.id"
        type="text"
        placeholder="ID del cliente"
      />
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
      <button @click="consultar()" :disabled="isConsultarBorrarDisabled">
        Consultar Por Id
      </button>
      <button @click="consultarTodos()">Consultar Todos</button>
      <button @click="actualizar()" :disabled="isActualizarDisabled">
        Actualizar
      </button>
      <button
        @click="actualizarParcial()"
        :disabled="isActualizarParcialDisabled"
      >
        Actualizar Parcialmente
      </button>
      <button @click="borrar()" :disabled="isConsultarBorrarDisabled">
        Borrar
      </button>
    </div>
    <div class="resultado" v-if="clientes.length > 0">
      <table>
        <thead>
          <th>ID</th>
          <th>Cedula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Razon Social</th>
          <th>Direccion</th>
          <th>Telefono</th>
          <th>Correo</th>
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
          </tr>
        </tbody>
      </table>
      <!-- <li
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
          Id: {{ id }} Cedula: {{ cedula }} - Nombre: {{ nombre }} - Apellido:
          {{ apellido }} - Razon Social: {{ razonSocial }} - Direccion:
          {{ direccion }} - Telefono: {{ telefono }} 
          Email {{ email }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import {
  consultarClienteFachada,
  guardarClienteFachada,
  actualizarClienteFachada,
  actualizarParcialClienteFachada,
  borrarClienteFachada,
  consultarClientesFachada,
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
    };
  },
  computed: {
    isConsultarBorrarDisabled() {
      return !this.cliente.id;
    },
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
    isActualizarDisabled() {
      const {
        id,
        cedula,
        nombre,
        apellido,
        razonSocial,
        direccion,
        telefono,
        email,
      } = this.cliente;
      return (
        !id ||
        !cedula ||
        !nombre ||
        !apellido ||
        !razonSocial ||
        !direccion ||
        !telefono ||
        !email
      );
    },
    isActualizarParcialDisabled() {
      const {
        cedula,
        nombre,
        apellido,
        razonSocial,
        direccion,
        telefono,
        email,
      } = this.cliente;
      const otrosCamposVacios =
        !cedula &&
        !nombre &&
        !apellido &&
        !razonSocial &&
        !direccion &&
        !telefono &&
        !email;
      return !this.cliente.id || otrosCamposVacios;
    },
  },

  methods: {
    async consultar() {
      const clienteEncontrado = await consultarClienteFachada(this.cliente.id);
      this.clientes = clienteEncontrado ? [clienteEncontrado] : [];
    },
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
    async actualizar() {
      const clienteBody = {
        cedula: this.cliente.cedula,
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        razonSocial: this.cliente.razonSocial,
        direccion: this.cliente.direccion,
        telefono: this.cliente.telefono,
        email: this.cliente.email,
      };
      await actualizarClienteFachada(this.cliente.id, clienteBody);
    },
    async actualizarParcial() {
      const clienteAnterior = await consultarClienteFachada(this.cliente.id);
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
      //this.limpiarFormulario();
    },
    async borrar() {
      await borrarClienteFachada(this.cliente.id);
      this.limpiarFormulario();
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
}

thead {
  margin-top: 25px;
  text-align: left;
  margin: 30px ;
}
tbody {
  font-size: 16px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
table {
  border-collapse: separate;
  border-radius: 12px;
  border-spacing: 20px;
  background: none;
  margin: auto;
  border: 1px solid #007bff;

}

td,
th {
    border-bottom: 1px rgba(180, 86, 239, 0.53) solid;
}

</style>