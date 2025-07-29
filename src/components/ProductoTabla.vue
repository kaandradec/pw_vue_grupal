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
  display: contents;
  width: 460px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #c0ecfd;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  padding: 10px 10px;
  margin-bottom: 10px;
}
th,
td {
  border: 1px solid #3956ff;
  padding: 8px;
}
button {
  margin: 3px;
  padding: 5px 10px;
  background: #00fd61;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background: #ff0000;
}
</style>
npm
