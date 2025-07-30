<template>
  <div class="container">
    <h1 class="title">Gestión de Bodegas</h1>

    <BodegaForm :bodega="bodega" @guardar="handleGuardar" @limpiar="limpiar" />

    <div v-if="mensaje" :class="['mensaje', mensajeTipo]">
      {{ mensaje }}
    </div>

    <div v-if="mostrarConfirmacionEliminar" class="confirmacion-modal">
      <div class="confirmacion-contenido">
        <p>¿Estás seguro de que quieres eliminar esta bodega?</p>
        <p>Esta acción no se puede deshacer.</p>
        <div class="button-group">
          <button @click="confirmarEliminar" class="btn-eliminar-confirm">Sí, Eliminar</button>
          <button @click="cancelarEliminar" class="btn-cancelar">No, Cancelar</button>
        </div>
      </div>
    </div>

    <BodegaBusqueda @buscar="handleBuscarPorCodigo" />

    <div v-if="resultadoBusqueda" class="resultado">
      <h3>Detalles de la Bodega Encontrada:</h3>
      <p><strong>ID:</strong> {{ resultadoBusqueda.id }}</p>
      <p><strong>Código:</strong> {{ resultadoBusqueda.codigo }}</p>
      <p><strong>Nombre:</strong> {{ resultadoBusqueda.nombre }}</p>
      <p><strong>Ubicación:</strong> {{ resultadoBusqueda.ubicacion }}</p>
      <div class="button-group">
        <button @click="cargarParaEditar(resultadoBusqueda)">Editar</button>
      </div>
    </div>

    <h2>Lista de Bodegas</h2>
    <BodegaTabla
      :bodegas="bodegas"
      @editar="cargarParaEditar"
      @eliminar="solicitarConfirmacionEliminar"
    />
  </div>
</template>

<script>
import BodegaForm from "@/components/Bodega/BodegaForm.vue";
import BodegaBusqueda from "@/components/Bodega/BodegaBusqueda.vue";
import BodegaTabla from "@/components/Bodega/BodegaTabla.vue";

import {
  obtenerTodasLasBodegas,
  guardarOActualizarBodega,
  eliminarBodegaPorId,
  buscarBodegaPorCodigo,
} from "@/services/BodegaService";

export default {
  name: "BodegasView",
  components: { BodegaForm, BodegaBusqueda, BodegaTabla },
  data() {
    return {
      bodega: { id: null, codigo: "", nombre: "", ubicacion: "" },
      bodegas: [],
      resultadoBusqueda: null,
      mensaje: "",
      mensajeTipo: "",
      mostrarConfirmacionEliminar: false,
      idBodegaAEliminar: null,
    };
  },
  methods: {
    async cargarBodegas() {
      this.mensaje = "";
      this.mensajeTipo = "";
      try {
        this.bodegas = await obtenerTodasLasBodegas();
      } catch (e) {
        this.mensaje = e.message;
        this.mensajeTipo = "error";
      }
    },

    async handleGuardar(bodegaData) {
      this.mensaje = "";
      this.mensajeTipo = "";
      try {
        this.mensaje = await guardarOActualizarBodega(bodegaData, this.bodegas);
        this.mensajeTipo = "exito";
        this.limpiar();
        await this.cargarBodegas();
      } catch (e) {
        this.mensaje = e.message;
        this.mensajeTipo = "error";
      }
    },

    solicitarConfirmacionEliminar(id) {
      this.idBodegaAEliminar = id;
      this.mostrarConfirmacionEliminar = true;
      this.mensaje = "";
      this.mensajeTipo = "";
    },

    async confirmarEliminar() {
      this.mostrarConfirmacionEliminar = false;
      this.mensaje = "";
      this.mensajeTipo = "";
      try {
        this.mensaje = await eliminarBodegaPorId(this.idBodegaAEliminar);
        this.mensajeTipo = "exito";
        await this.cargarBodegas();
      } catch (e) {
        this.mensaje = e.message;
        this.mensajeTipo = "error";
      } finally {
        this.idBodegaAEliminar = null;
      }
    },

    cancelarEliminar() {
      this.mostrarConfirmacionEliminar = false;
      this.idBodegaAEliminar = null;
      this.mensaje = "Eliminación cancelada.";
      this.mensajeTipo = "info";
    },

    async handleEliminar(id) {
    },

    async handleBuscarPorCodigo(codigo) {
      this.mensaje = "";
      this.mensajeTipo = "";
      this.resultadoBusqueda = null;
      if (!codigo) {
        this.mensaje = "Por favor, ingresa un código para buscar.";
        this.mensajeTipo = "advertencia";
        return;
      }
      try {
        const resultado = await buscarBodegaPorCodigo(codigo);
        if (resultado) {
          this.resultadoBusqueda = resultado;
          this.mensaje = `Bodega con código '${codigo}' encontrada.`;
          this.mensajeTipo = "exito";
        } else {
          this.mensaje = `No se encontró una bodega con el código '${codigo}'.`;
          this.mensajeTipo = "info";
        }
      } catch (e) {
        this.mensaje = e.message;
        this.mensajeTipo = "error";
      }
    },

    cargarParaEditar(bod) {
      this.bodega = { ...bod };
      this.resultadoBusqueda = null;
      this.mensaje = "Modifica los campos y haz clic en 'Actualizar'.";
      this.mensajeTipo = "info";
      this.mostrarConfirmacionEliminar = false;
    },

    limpiar() {
      this.bodega = { id: null, codigo: "", nombre: "", ubicacion: "" };
      this.resultadoBusqueda = null;
      this.mensaje = "";
      this.mensajeTipo = "";
      this.mostrarConfirmacionEliminar = false;
    },
  },
  mounted() {
    this.cargarBodegas();
  },
};
</script>

<style scoped >
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.mensaje {
  margin-top: 15px;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;
  animation: fadeIn 0.5s;
}

.mensaje.exito {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensaje.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.mensaje.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
  margin-bottom: 15px;
}

.mensaje.advertencia {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.resultado {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.resultado h3 {
  color: #1890ff;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

.resultado p {
  margin: 8px 0;
  font-size: 1.05em;
}

.resultado strong {
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
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

.confirmacion-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmacion-contenido {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.confirmacion-contenido p {
  margin-bottom: 20px;
  font-size: 1.1em;
  color: #333;
}

.confirmacion-contenido .button-group button {
  background-color: #007bff;
  color: white;
  border: none;
}

.confirmacion-contenido .button-group button:hover {
  background-color: #0056b3;
}

.confirmacion-contenido .btn-eliminar-confirm {
  background-color: #dc3545;
}

.confirmacion-contenido .btn-eliminar-confirm:hover {
  background-color: #c82333;
}

.confirmacion-contenido .btn-cancelar {
  background-color: #6c757d;
}

.confirmacion-contenido .btn-cancelar:hover {
  background-color: #5a6268;
}
</style>