<template>
  <form @submit.prevent="onSubmit" class="formulario">
    <input
      v-model="localBodega.codigo"
      placeholder="Código (6 caracteres)"
      required
      minlength="6"
      maxlength="6"
      :disabled="localBodega.id !== null"
    />
    <input v-model="localBodega.nombre" placeholder="Nombre" required />
    <input v-model="localBodega.ubicacion" placeholder="Ubicación" required />

    <div class="button-group">
      <button type="submit">{{ localBodega.id ? 'Actualizar' : 'Guardar' }}</button>
      <button type="button" @click="limpiar">Limpiar</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BodegaForm',
  props: ['bodega'],
  emits: ['guardar', 'limpiar'],
  data() {
    return {
      localBodega: { ...this.bodega }
    };
  },
  watch: {
    bodega(newVal) {
      this.localBodega = { ...newVal };
    }
  },
  methods: {
    onSubmit() {
      this.$emit('guardar', { ...this.localBodega });
    },
    limpiar() {
      this.localBodega = { id: null, codigo: '', nombre: '', ubicacion: '' };
      this.$emit('limpiar');
    }
  }
};
</script>

<style scoped>
.formulario input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #ccc;
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
</style>
