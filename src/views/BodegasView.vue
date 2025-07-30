<template>
  <div class="container">
    <h1 class="title">Gestión de Bodegas</h1>

    <form @submit.prevent="guardar" class="formulario">
      <input v-model="bodega.codigo" placeholder="Código (6 caracteres)" required minlength="6" maxlength="6" />
      <input v-model="bodega.nombre" placeholder="Nombre" required />
      <input v-model="bodega.ubicacion" placeholder="Ubicación" required />
      <div class="button-group">
        <button type="submit">{{ bodega.id ? 'Actualizar' : 'Guardar' }}</button>
        <button type="button" @click="limpiar">Limpiar</button>
      </div>
    </form>

    <div class="acciones">
      <input v-model="codigoBusqueda" placeholder="Código a buscar" maxlength="6" minlength="6" />
      <button @click="buscarPorCodigo">Buscar</button>
    </div>

    <div v-if="resultadoBusqueda" class="resultado">
      <p><strong>ID:</strong> {{ resultadoBusqueda.id }}</p>
      <p><strong>Código:</strong> {{ resultadoBusqueda.codigo }}</p>
      <p><strong>Nombre:</strong> {{ resultadoBusqueda.nombre }}</p>
      <p><strong>Ubicación:</strong> {{ resultadoBusqueda.ubicacion }}</p>
      <button @click="cargarParaEditar(resultadoBusqueda)">Editar</button>
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
  borrarBodegaFachada,
  consultarBodegaPorCodigoFachada
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
      codigoBusqueda: '',
      resultadoBusqueda: null
    };
  },
  methods: {
    async cargarBodegas() {
      this.bodegas = await consultarBodegasFachada();
    },
    async guardar() {
      if (this.bodega.codigo.length !== 6) {
        alert('El código debe tener exactamente 6 caracteres.');
        return;
      }

      if (this.bodega.id) {
       await actualizarBodegaFachada(this.bodega);
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
    async buscarPorCodigo() {
      try {
        const res = await consultarBodegaPorCodigoFachada(this.codigoBusqueda);
        if (res && res.codigo === this.codigoBusqueda) {
          this.resultadoBusqueda = res;
        } else {
          this.resultadoBusqueda = null;
          alert('No se encontró una bodega con ese código.');
        }
      } catch (err) {
        this.resultadoBusqueda = null;
        alert('No se encontró una bodega con ese código.');
      }
    },
    cargarParaEditar(bod) {
      this.bodega = { ...bod };
      this.resultadoBusqueda = null;
    },
    limpiar() {
      this.bodega = { id: null, codigo: '', nombre: '', ubicacion: '' };
      this.codigoBusqueda = '';
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

.acciones {
  margin-bottom: 16px;
}

.acciones input {
  padding: 6px;
  width: calc(100% - 100px);
  max-width: 300px;
  margin-right: 8px;
}

.resultado {
  background-color: #f0f9ff;
  padding: 12px;
  margin-top: 12px;
  border: 1px solid #cce;
  border-radius: 8px;
}

.resultado button {
  margin-top: 8px;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.tabla th,
.tabla td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.tabla th {
  background-color: #f4f4f4;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.button-group button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button-group button:hover {
  background-color: #0056b3;
}

.acciones {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.acciones input {
  padding: 8px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
}

.acciones button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.acciones button:hover {
  background-color: #1e7e34;
}

</style>
