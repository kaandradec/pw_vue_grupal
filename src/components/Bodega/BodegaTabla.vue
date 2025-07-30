<template>
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
        <td class="botones-acciones">
          <button @click="$emit('editar', bod)">Editar</button>
          <button @click="$emit('eliminar', bod.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'BodegaTabla',
  props: ['bodegas'],
  emits: ['editar', 'eliminar']
};
</script>

<style scoped>
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  border-radius: 9px;
  overflow: hidden;
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

.botones-acciones {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.botones-acciones button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.botones-acciones button:hover {
  background-color: #0056b3;
}
</style>
