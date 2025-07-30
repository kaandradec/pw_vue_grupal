<template>
  <div class="container">
    <h2>{{ formProducto.id ? "Editar Producto" : "Nuevo Producto" }}</h2>

    <!-- Código de Barras -->
    <label>Código de Barras:</label>
    <input
      type="text"
      v-model="formProducto.codigoBarras"
      :disabled="formProducto.id !== null"
      maxlength="13"
    />
    <span v-if="errores.codigoBarras" class="error">{{
      errores.codigoBarras
    }}</span>

    <!-- Nombre -->
    <label>Nombre:</label>
    <input type="text" v-model="formProducto.nombre" />
    <span v-if="errores.nombre" class="error">{{ errores.nombre }}</span>

    <!-- Categoría -->
    <label>Categoría:</label>
    <select v-model="formProducto.categoria" @change="asignarBodegaSiServicio">
      <option disabled value="">Seleccione categoría</option>
      <option value="producto">Producto</option>
      <option value="servicio">Servicio</option>
    </select>
    <span v-if="errores.categoria" class="error">{{ errores.categoria }}</span>

    <!-- Precio -->
    <label>Precio:</label>
    <input type="number" v-model="formProducto.precio" />
    <span v-if="errores.precio" class="error">{{ errores.precio }}</span>

    <!-- Stock -->
    <label>Stock:</label>
    <input
      type="number"
      v-model="formProducto.stock"
      :disabled="formProducto.categoria === 'servicio'"
    />
    <span v-if="errores.stock" class="error">{{ errores.stock }}</span>

    <!-- Bodega -->
    <label>Bodega:</label>
    <select v-model="formProducto.bodegaId">
      <option disabled value="">Seleccione bodega</option>
      <option v-for="b in bodegas" :key="b.id" :value="b.id">
        {{ b.codigo }} - {{ b.ubicacion }}
      </option>
    </select>
    <span v-if="errores.bodegaId" class="error">{{ errores.bodegaId }}</span>

    <!-- Impuestos -->
    <div class="impuestos-section">
      <label>Impuestos:</label>
      <div
        v-for="(imp, idx) in formProducto.impuestos"
        :key="idx"
        class="impuesto-item"
      >
        <select v-model="imp.idImpuesto" @change="actualizarPorcentaje(idx)">
          <option disabled value="">-- Selecciona impuesto --</option>
          <option v-for="op in impuestos" :key="op.id" :value="op.id">
            {{ op.nombre }} ({{ op.porcentaje }}%)
          </option>
        </select>
      </div>
    </div>

    <!-- Botones -->
    <div class="acciones">
      <button @click="onGuardar">Guardar</button>
      <button @click="onActualizar">Actualizar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    producto: { type: Object, default: () => ({}) },
    bodegas: { type: Array, default: () => [] },
    impuestos: { type: Array, default: () => [] },
    productosExistentes: { type: Array, default: () => [] }, // Productos para validar código barras duplicado
  },
  data() {
    return {
      formProducto: {
        id: null,
        codigoBarras: "",
        nombre: "",
        categoria: "",
        stock: 0,
        precio: 0,
        bodegaId: null,
        impuestos: [{ idImpuesto: "", porcentaje: 0 }],
      },
      errores: {},
    };
  },
  watch: {
    producto: {
      handler(nuevo) {
        if (!nuevo) {
          this.limpiar();
          return;
        }
        this.formProducto = {
          id: nuevo.id || null,
          codigoBarras: nuevo.codigoBarras || "",
          nombre: nuevo.nombre || "",
          categoria: nuevo.categoria || "",
          stock: nuevo.stock || 0,
          precio: nuevo.precio || 0,
          bodegaId: nuevo.bodegaId || null,
          impuestos:
            Array.isArray(nuevo.impuestos) && nuevo.impuestos.length > 0
              ? nuevo.impuestos.map((i) => ({
                  idImpuesto: i.id || "",
                  porcentaje: i.porcentaje || 0,
                }))
              : [{ idImpuesto: "", porcentaje: 0 }],
        };
        this.errores = {};
      },
      immediate: true,
    },
  },
  methods: {
    limpiar() {
      this.formProducto = {
        id: null,
        codigoBarras: "",
        nombre: "",
        categoria: "",
        stock: 0,
        precio: 0,
        bodegaId: null,
        impuestos: [{ idImpuesto: "", porcentaje: 0 }],
      };
      this.errores = {};
      this.$emit("limpiar");
    },
    asignarBodegaSiServicio() {
      if (this.formProducto.categoria === "servicio") {
        this.formProducto.stock = 0;
        // No asignar bodega automáticamente, el usuario elige libremente
      }
    },
    actualizarPorcentaje(idx) {
      const id = this.formProducto.impuestos[idx].idImpuesto;
      const impData = this.impuestos.find((i) => i.id === id);
      if (impData) {
        this.formProducto.impuestos[idx].porcentaje = impData.porcentaje;
      }
    },
    validarFormulario() {
      this.errores = {};

      // Código de barras
      if (!this.formProducto.codigoBarras.trim()) {
        this.errores.codigoBarras = "El código de barras es obligatorio.";
      } else if (!/^\d+$/.test(this.formProducto.codigoBarras)) {
        this.errores.codigoBarras =
          "El código de barras debe ser solo números.";
      } else if (
        !this.formProducto.id &&
        this.productosExistentes.some(
          (p) => p.codigoBarras === this.formProducto.codigoBarras
        )
      ) {
        this.errores.codigoBarras = "Este código de barras ya existe.";
      }

      // Nombre
      if (!this.formProducto.nombre.trim()) {
        this.errores.nombre = "El nombre es obligatorio.";
      } else if (/^\d+$/.test(this.formProducto.nombre.trim())) {
        this.errores.nombre = "El nombre no puede ser solo números.";
      }

      // Categoría
      if (!this.formProducto.categoria) {
        this.errores.categoria = "Debe seleccionar una categoría.";
      }

      // Stock
      if (
        this.formProducto.categoria === "producto" &&
        (this.formProducto.stock === null ||
          this.formProducto.stock < 0 ||
          isNaN(this.formProducto.stock))
      ) {
        this.errores.stock = "El stock debe ser un número mayor o igual a 0.";
      }

      // Precio
      if (this.formProducto.precio === null || this.formProducto.precio <= 0) {
        this.errores.precio = "El precio debe ser un número mayor que 0.";
      }

      // Bodega (obligatoria sólo para producto y servicio)
      if (!this.formProducto.bodegaId) {
        this.errores.bodegaId = "Debe seleccionar una bodega.";
      }

      return Object.keys(this.errores).length === 0;
    },
    onGuardar() {
      if (this.validarFormulario()) {
        this.$emit("guardar", this.formProducto);
        this.limpiar();
      }
    },
    onActualizar() {
      if (this.validarFormulario()) {
        this.$emit("actualizar", this.formProducto);
        this.limpiar();
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 460px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

label {
  text-align: left;
  display: block;
  margin-top: 10px;
  font-weight: 600;
  color: #2c3e50;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.impuestos-section {
  border: 1px solid #007bff;
  padding: 15px;
  margin-top: 20px;
  background: #eaf2ff;
  border-radius: 8px;
}

button {
  margin: 10px 5px;
  padding: 10px 18px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

.acciones {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.impuesto-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.error {
  color: red;
  font-size: 0.85em;
  margin-top: 3px;
}
</style>
