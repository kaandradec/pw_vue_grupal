<template>
  <div class="container">
    <h1 class="title">Gestión de Bodegas</h1>

    <form @submit.prevent="guardar" class="formulario">
      <input v-model="bodega.codigo" placeholder="Código" required />
      <input v-model="bodega.nombre" placeholder="Nombre" required />
      <input v-model="bodega.ubicacion" placeholder="Ubicación" required />
      <div class="button-group">
        <button type="submit">Guardar</button>
        <button type="button" @click="limpiar">Limpiar</button>
      </div>
    </form>

    <div class="acciones">
      <input v-model.number="idBusqueda" placeholder="ID a buscar" type="number" />
      <button @click="buscarPorId">Buscar</button>
    </div>

    <div v-if="resultadoBusqueda" class="resultado">
      <p><strong>Resultado:</strong> {{ resultadoBusqueda }}</p>
    </div>

    <h2>Lista de Bodegas</h2>
    <table class="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Ubicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bod in bodegas" :key="bod.id">
          <td>{{ bod.id }}</td>
          <td>{{ bod.codigo }}</td>
          <td>{{ bod.nombre }}</td>
          <td>{{ bod.ubicacion }}</td>
          <td>
            <button @click="cargarParaEditar(bod)">Editar</button>
            <button @click="eliminar(bod.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  guardarBodegaFachada,
  consultarBodegasFachada,
  consultarBodegaFachada,
  actualizarBodegaFachada,
  borrarBodegaFachada
} from '@/clients/BodegaClient';

export default {
  name: 'BodegasView',
  data() {
    return {
      bodega: {
        id: null,
        codigo: '',
        nombre: '',
        ubicacion: ''
      },
      bodegas: [],
      idBusqueda: null,
      resultadoBusqueda: null
    };
  },
  methods: {
    async cargarBodegas() {
      this.bodegas = await consultarBodegasFachada();
    },
    async guardar() {
      if (this.bodega.id) {
        await actualizarBodegaFachada(this.bodega.id, this.bodega);
      } else {
        await guardarBodegaFachada(this.bodega);
      }
      this.limpiar();
      this.cargarBodegas();
    },
    async eliminar(id) {
      await borrarBodegaFachada(id);
      this.cargarBodegas();
    },
    async buscarPorId() {
      const res = await consultarBodegaFachada(this.idBusqueda);
      this.resultadoBusqueda = res;
    },
    cargarParaEditar(bod) {
      this.bodega = { ...bod };
    },
    limpiar() {
      this.bodega = { id: null, codigo: '', nombre: '', ubicacion: '' };
      this.resultadoBusqueda = null;
    }
  },
  mounted() {
    this.cargarBodegas();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 16px;
}

.title {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}

.formulario input {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.acciones input {
  margin-right: 8px;
  padding: 6px;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.tabla th, .tabla td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.tabla th {
  background-color: #f4f4f4;
}

.resultado {
  background-color: #e0ffe0;
  padding: 8px;
  margin-top: 12px;
}
</style>
