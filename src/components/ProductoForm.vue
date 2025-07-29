<template>
  <div class="container">
    <h2>{{ formProducto.id ? "Editar Producto" : "Nuevo Producto" }}</h2>

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

    <label>Nombre:</label>
    <input type="text" v-model="formProducto.nombre" />
    <span v-if="errores.nombre" class="error">{{ errores.nombre }}</span>

    <label>Categoría:</label>
    <select v-model="formProducto.categoria">
      <option disabled value="">Seleccione categoría</option>
      <option value="producto">Producto</option>
      <option value="servicio">Servicio</option>
    </select>
    <span v-if="errores.categoria" class="error">{{ errores.categoria }}</span>

    <label>Stock:</label>
    <input type="number" v-model="formProducto.stock" />
    <span v-if="errores.stock" class="error">{{ errores.stock }}</span>

    <label>Precio:</label>
    <input type="number" v-model="formProducto.precio" />
    <span v-if="errores.precio" class="error">{{ errores.precio }}</span>

    <!-- Seleccionar Bodega -->
    <label>Bodega:</label>
    <select v-model="formProducto.bodegaId" required>
      <option disabled value="">Seleccione bodega</option>
      <option v-for="b in bodegas" :key="b.id" :value="b.id">
        {{ b.codigo }} - {{ b.ubicacion }}
      </option>
    </select>
    <span v-if="errores.bodegaId" class="error">{{ errores.bodegaId }}</span>

    <!-- Sección de Impuestos debajo del precio -->
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
        <button type="button" @click="eliminarImpuesto(idx)">
          Quitar Impuesto
        </button>
      </div>
      <span v-if="errores.impuestos" class="error">{{
        errores.impuestos
      }}</span>
    </div>

    <div class="acciones">
      <button @click="onGuardar">Guardar</button>
      <button @click="onActualizar">Actualizar</button>
      <button @click="limpiar">Limpiar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    producto: { type: Object, default: () => ({}) },
    bodegas: { type: Array, default: () => [] },
    impuestos: { type: Array, default: () => [] },
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
    eliminarImpuesto(idx) {
      this.formProducto.impuestos.splice(idx, 1);
      if (this.formProducto.impuestos.length === 0) {
        this.formProducto.impuestos.push({ idImpuesto: "", porcentaje: 0 });
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

      // Código de barras: requerido, solo números, no vacío
      if (!this.formProducto.codigoBarras.trim()) {
        this.errores.codigoBarras = "El código de barras es obligatorio.";
      } else if (!/^\d+$/.test(this.formProducto.codigoBarras)) {
        this.errores.codigoBarras =
          "El código de barras debe ser solo números.";
      }

      // Nombre: requerido, no vacío, no solo números
      if (!this.formProducto.nombre.trim()) {
        this.errores.nombre = "El nombre es obligatorio.";
      } else if (/^\d+$/.test(this.formProducto.nombre.trim())) {
        this.errores.nombre = "El nombre no puede ser solo números.";
      }

      // Categoría: requerido y debe ser producto o servicio
      if (!this.formProducto.categoria) {
        this.errores.categoria = "Debe seleccionar una categoría.";
      } else if (
        !["producto", "servicio"].includes(this.formProducto.categoria)
      ) {
        this.errores.categoria = "Categoría inválida.";
      }

      // Stock: debe ser número >= 0
      if (
        this.formProducto.stock === null ||
        this.formProducto.stock < 0 ||
        isNaN(this.formProducto.stock)
      ) {
        this.errores.stock = "El stock debe ser un número mayor o igual a 0.";
      }

      // Precio: debe ser número > 0
      if (
        this.formProducto.precio === null ||
        this.formProducto.precio <= 0 ||
        isNaN(this.formProducto.precio)
      ) {
        this.errores.precio = "El precio debe ser un número mayor que 0.";
      }

      // Bodega: requerida
      if (!this.formProducto.bodegaId) {
        this.errores.bodegaId = "Debe seleccionar una bodega.";
      }

      // Impuestos: validar que todos estén seleccionados
      const impuestosInvalidos = this.formProducto.impuestos.some(
        (imp) => !imp.idImpuesto
      );
      if (impuestosInvalidos) {
        this.errores.impuestos =
          "Seleccione todos los impuestos o elimine vacíos.";
      }

      return Object.keys(this.errores).length === 0;
    },
    onGuardar() {
      if (this.validarFormulario()) {
        this.$emit("guardar", this.formProducto);
      }
    },
    onActualizar() {
      if (this.validarFormulario()) {
        this.$emit("actualizar", this.formProducto);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 460px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f1c1c1;
  text-align: left;
}
label {
  display: flex;
  margin-top: 8px;
  font-weight: bold;
}
input,
select {
  width: 420px;
  padding: 5px;
  margin-top: 3px;
}
.impuestos-section {
  border: 1px solid #dddddd;
  padding: 10px 10px;
  margin-top: 25px;
  margin-bottom: 35px;
  background: #9799fa;
  width: 440px;
}
button {
  margin: 10px;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.acciones {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.impuesto-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.error {
  color: red;
  font-size: 0.85em;
  margin-top: 3px;
  display: block;
}
</style>
