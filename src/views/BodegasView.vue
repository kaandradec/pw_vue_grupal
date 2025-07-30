<template>
  <div class="container">
    <h1 class="title">Gestión de Bodegas</h1>

    <BodegaForm :bodega="bodega" @guardar="guardar" @limpiar="limpiar" />

    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>

    <BodegaBusqueda @buscar="buscarPorCodigo" />

    <div v-if="resultadoBusqueda" class="resultado">
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
      @eliminar="eliminar"
    />
  </div>
</template>

<script>
import BodegaForm from "@/components/Bodega/BodegaForm.vue";
import BodegaBusqueda from "@/components/Bodega/BodegaBusqueda.vue";
import BodegaTabla from "@/components/Bodega/BodegaTabla.vue";

import {
  guardarBodegaFachada,
  consultarBodegasFachada,
  actualizarBodegaFachada,
  borrarBodegaFachada,
  consultarBodegaPorCodigoFachada,
} from "@/clients/BodegaClient";

export default {
  name: "BodegasView",
  components: { BodegaForm, BodegaBusqueda, BodegaTabla },
  data() {
    return {
      bodega: { id: null, codigo: "", nombre: "", ubicacion: "" },
      bodegas: [],
      resultadoBusqueda: null,
      mensaje: "",
    };
  },
  methods: {
    async cargarBodegas() {
      this.bodegas = await consultarBodegasFachada();
    },
    async guardar(bodegaData) {
      this.mensaje = "";

      if (bodegaData.codigo.length !== 6) {
        this.mensaje = "El código debe tener exactamente 6 caracteres.";
        return;
      }

      const existe = this.bodegas.some(
        (bod) => bod.codigo === bodegaData.codigo && bod.id !== bodegaData.id
      );

      if (existe) {
        this.mensaje = "Ya existe una bodega con ese código.";
        return;
      }

      try {
        if (bodegaData.id) {
          await actualizarBodegaFachada(bodegaData);
          this.mensaje = "Bodega actualizada correctamente.";
        } else {
          await guardarBodegaFachada(bodegaData);
          this.mensaje = "Bodega guardada correctamente.";
        }
        this.limpiar();
        this.cargarBodegas();
      } catch (e) {
        this.mensaje = "Ocurrió un error al guardar la bodega.";
      }
    },
    async eliminar(id) {
      try {
        await borrarBodegaFachada(id);
        this.mensaje = "Bodega eliminada.";
        this.cargarBodegas();
      } catch {
        this.mensaje = "Error al eliminar la bodega.";
      }
    },
    async buscarPorCodigo(codigo) {
      this.mensaje = "";
      try {
        const res = await consultarBodegaPorCodigoFachada(codigo);
        if (res && res.codigo === codigo) {
          this.resultadoBusqueda = res;
        } else {
          this.resultadoBusqueda = null;
          this.mensaje = "No se encontró una bodega con ese código.";
        }
      } catch {
        this.resultadoBusqueda = null;
        this.mensaje = "No se encontró una bodega con ese código.";
      }
    },
    cargarParaEditar(bod) {
      this.bodega = { ...bod };
      this.resultadoBusqueda = null;
      this.mensaje = "";
    },
    limpiar() {
      this.bodega = { id: null, codigo: "", nombre: "", ubicacion: "" };
      this.resultadoBusqueda = null;
      this.mensaje = "";
    },
  },
  mounted() {
    this.cargarBodegas();
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style >