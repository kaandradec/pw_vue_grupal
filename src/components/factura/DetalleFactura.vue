<template>
  <div class="section">
    <h2>Detalles de Factura</h2>
    <div class="detalle-container">
      <div class="detalle-header">
        <h3>Agregar Producto/Servicio</h3>
        <button type="button" @click="agregarDetalle" class="btn-add">
          + Agregar Producto
        </button>
      </div>

      <div
        v-for="(detalle, index) in detalles"
        :key="index"
        class="detalle-item"
      >
        <div class="detalle-grid-vertical">
          <div class="row">
            <div class="form-group">
              <label>Código de Barras</label>
              <div class="search-container">
                <input
                  type="text"
                  v-model="detalle.codigoBarras"
                  @blur="buscarProducto(index)"
                  placeholder="123456789"
                />
                <button
                  type="button"
                  @click="buscarProducto(index)"
                  class="search-btn"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" v-model="detalle.nombre" readonly />
            </div>
            <div class="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                v-model="detalle.cantidad"
                min="1"
                :max="detalle.stock"
                @input="calcularSubtotal(index)"
                :class="{ error: erroresStock && erroresStock[index] }"
              />
              <span
                v-if="erroresStock && erroresStock[index]"
                class="error-message"
              >
                {{ erroresStock[index] }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label>Precio</label>
              <input
                type="number"
                v-model="detalle.precio"
                step="0.01"
                readonly
              />
            </div>
            <div class="form-group">
              <label>Subtotal</label>
              <input
                type="number"
                v-model="detalle.subtotal"
                step="0.01"
                readonly
              />
            </div>
            <div class="form-group form-group-btn">
              <label style="visibility: hidden">Borrar</label>
              <button
                type="button"
                @click="eliminarDetalle(index)"
                class="btn-delete"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buscarProductoPorCodigoBarrasFachada } from "@/clients/facturaClients.js";

export default {
  name: "DetalleFactura",
  data() {
    return {
      detalles: [],
      erroresStock: [], // Para almacenar errores de stock por índice
    };
  },
  watch: {
    // Watcher profundo para observar cambios en el array detalles
    detalles: {
      handler(nuevoDetalles) {
        nuevoDetalles.forEach((detalle, index) => {
          this.validarStock(index);
        });
      },
      deep: true, // Observa cambios profundos en objetos dentro del array
    },
  },
  methods: {
    async buscarProducto(index) {
      const detalle = this.detalles[index];
      if (!detalle.codigoBarras) return;

      try {
        const producto = await buscarProductoPorCodigoBarrasFachada(
          detalle.codigoBarras
        );
        detalle.nombre = producto.nombre || "";
        detalle.precio = producto.precio || 0;
        detalle.stock = producto.stock || 0;

        detalle.impuesto =
          Array.isArray(producto.impuestos) && producto.impuestos.length > 0
            ? producto.impuestos[0].porcentaje
            : 0;

        detalle.producto = { id: producto.id };
        this.calcularSubtotal(index);
        this.$emit("mensaje", "Producto encontrado", "success");
      } catch (error) {
        detalle.nombre = "";
        detalle.precio = 0;
        detalle.impuesto = 0;
        detalle.producto = null;
        this.calcularSubtotal(index);
        this.$emit("mensaje", "Producto no encontrado", "error");
      }

      this.emitirCambios();
    },

    calcularSubtotal(index) {
      const d = this.detalles[index];
      const cantidad = parseFloat(d.cantidad) || 0;
      const precio = parseFloat(d.precio) || 0;
      const impuesto = parseFloat(d.impuesto) || 0;
      d.subtotal = (cantidad * precio).toFixed(2);
      this.validarStock(index); // Validar stock al calcular subtotal
      this.emitirCambios();
    },

    validarStock(index) {
      const detalle = this.detalles[index];
      const cantidad = parseFloat(detalle.cantidad) || 0;
      const stock = parseFloat(detalle.stock) || 0;

      // Asegurar que erroresStock tenga el tamaño correcto
      while (this.erroresStock.length <= index) {
        this.erroresStock.push(null);
      }

      if (cantidad > stock && stock > 0) {
        // En Vue 3, simplemente asignamos directamente
        this.erroresStock[index] = `Stock insuficiente. Disponible: ${stock}`;
        this.$emit(
          "mensaje",
          `Stock insuficiente para el producto. Disponible: ${stock}`,
          "error"
        );
      } else {
        this.erroresStock[index] = null;
      }
    },

    agregarDetalle() {
      this.detalles.push({
        codigoBarras: "",
        nombre: "",
        cantidad: 1,
        precio: 0,
        impuesto: 0,
        subtotal: 0,
        stock: 0,
        producto: null,
      });
      // Inicializar error de stock para el nuevo detalle
      if (!this.erroresStock) {
        this.erroresStock = [];
      }
      this.erroresStock.push(null);
      this.emitirCambios();
    },

    eliminarDetalle(index) {
      this.detalles.splice(index, 1);
      // También eliminar el error correspondiente
      if (this.erroresStock && this.erroresStock.length > index) {
        this.erroresStock.splice(index, 1);
      }
      this.emitirCambios();
    },

    emitirCambios() {
      this.$emit("detalles-cambiados", this.detalles);
    },

    limpiar() {
      this.detalles = [];
      this.erroresStock = [];
      this.emitirCambios();
    },
  },
};
</script>

<style scoped>
.section {
  padding: 25px;
  border-bottom: 1px solid #e9ecef;
}

.section h2 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.detalle-container {
  margin-top: 20px;
}

.detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.detalle-header h3 {
  margin: 0;
  color: #495057;
}

.btn-add {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-add:hover {
  background: #218838;
}

.detalle-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}

.detalle-grid-vertical {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detalle-grid-vertical .row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 15px;
  align-items: end;
}

.detalle-grid-vertical .row + .row {
  margin-top: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
}

.form-group input {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group input[readonly] {
  background-color: #f8f9fa;
  color: #6c757d;
}

.form-group input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
}

.search-container {
  position: relative;
  display: flex;
}

.search-container input {
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-btn {
  padding: 12px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: pointer;
}

.search-btn:hover {
  background: #0056b3;
}

.form-group-btn {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.btn-delete {
  background: #dc3545;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-delete:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .detalle-grid-vertical .row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .detalle-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .section {
    padding: 15px;
  }
}
</style> 