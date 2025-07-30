<template>
  <div class="container-General">
    <h1>Gestión de Productos</h1>

    <ProductoForm
      :producto="productoEditar"
      :impuestos="listaImpuestos"
      :bodegas="listaBodegas"
      :productosExistentes="listaProductos"
      @guardar="guardarProducto"
      @actualizar="actualizarProducto"
      @limpiar="limpiarFormulario"
    />

    <ProductoTabla
      :productos="listaProductos"
      @editar="seleccionarProducto"
      @eliminar="eliminarProducto"
    />

    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import ProductoForm from "@/components/Producto-Servicio/ProductoForm.vue";
import ProductoTabla from "@/components/Producto-Servicio/ProductoTabla.vue";

import {
  L_ProductosFachada,
  G_ProductoFachada,
  EProductoFachada,
  Patch_ProductoFachada,
} from "@/clients/productoClients";

import { L_ImpuestosFachada } from "@/clients/impuestoClients";
import { consultarBodegasFachada } from "@/clients/BodegaClient";

export default {
  components: { ProductoForm, ProductoTabla },
  data() {
    return {
      listaProductos: [],
      listaImpuestos: [],
      listaBodegas: [],
      productoEditar: null,
      mensaje: "",
    };
  },
  async mounted() {
    this.listaImpuestos = await L_ImpuestosFachada();
    this.listaBodegas = await consultarBodegasFachada();
    this.listaProductos = await L_ProductosFachada();
  },
  methods: {
    async guardarProducto(prod) {
      if (!prod.bodegaId) {
        this.mensaje = "Debe seleccionar una bodega para el producto";
        return;
      }

      const productoParaGuardar = {
        codigoBarras: prod.codigoBarras,
        nombre: prod.nombre,
        categoria: prod.categoria,
        stock: prod.stock,
        precio: prod.precio,
        bodega: { id: prod.bodegaId },
        impuestos: Array.isArray(prod.impuestos)
          ? prod.impuestos.map((i) => ({ id: i.idImpuesto }))
          : [],
      };

      console.log("Producto para guardar:", productoParaGuardar);

      try {
        await G_ProductoFachada(productoParaGuardar);
        this.mensaje = "Producto guardado correctamente";
        this.listaProductos = await L_ProductosFachada();
        this.limpiarFormulario();
      } catch (error) {
        console.error(
          "Error al guardar producto:",
          error.response?.data || error
        );
        this.mensaje =
          "Error al guardar producto: " +
          (error.response?.data?.message || error.message);
      }
    },

    async actualizarProducto(prod) {
      if (!prod.id) {
        this.mensaje = "Selecciona un producto para actualizar";
        return;
      }

      const datosParciales = {
        nombre: prod.nombre,
        categoria: prod.categoria,
        stock: prod.stock,
        precio: prod.precio,
        bodegaId: prod.bodegaId,
        impuestos: prod.impuestos.map((i) => ({ id: i.idImpuesto })),
      };

      try {
        await Patch_ProductoFachada(prod.id, datosParciales);
        this.mensaje = "Producto actualizado correctamente";
        this.listaProductos = await L_ProductosFachada();
        this.limpiarFormulario();
      } catch (error) {
        console.error(
          "Error al actualizar parcialmente:",
          error.response?.data || error
        );
        this.mensaje =
          "Error al actualizar producto: " +
          (error.response?.data?.message || error.message);
      }
    },
    limpiarFormulario() {
      this.productoEditar = null;
    },
    seleccionarProducto(prod) {
      this.productoEditar = { ...prod };
      this.mensaje = "";
    },
    async eliminarProducto(id) {
      this.listaProductos = this.listaProductos.filter((p) => p.id !== id);

      try {
        await EProductoFachada(id);
        this.mensaje = "Producto eliminado correctamente";
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        this.mensaje = "Error al eliminar el producto";

        this.listaProductos = await L_ProductosFachada();
      }

      if (this.productoEditar && this.productoEditar.id === id) {
        this.limpiarFormulario();
      }
    },
  },
};
</script>

<style scoped>
.container-General {
  max-width: 800px;
  margin: 30px auto;
  padding: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  border: 1px solid #e1e1e1;
}

h1 {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
}
</style>
