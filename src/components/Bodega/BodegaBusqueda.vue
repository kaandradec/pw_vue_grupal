<template>
  <div class="acciones">
    <input v-model="codigo" placeholder="Código a buscar" maxlength="6" minlength="6" />
    <button @click="$emit('buscar', codigo)">Buscar</button>
  </div>
</template>

<script>
export default {
  name: 'BodegaBusqueda',
  data() {
    return { codigo: '' };
  }
};
</script>

<style scoped>
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
  border-radius: 6px;
  border: 1px solid #ccc;
}

.acciones button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.acciones button:hover {
  background-color: #0056b3;
}
</style>
