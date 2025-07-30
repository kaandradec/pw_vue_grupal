<template>
  <div class="container-tabla">
    <h2>Lista de Productos</h2>
    <table v-if="productos.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>CB</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.codigoBarras }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.categoria }}</td>
          <td>
            <button @click="$emit('editar', p)">Editar</button>
            <button @click="$emit('eliminar', p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay productos registrados</p>
  </div>
</template>

<script>
export default {
  props: {
    productos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.container-tabla {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th {
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
}

td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

button {
  margin: 3px;
  padding: 8px 15px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s ease;
}

button:hover {
  background: #218838;
}
</style>

npm
