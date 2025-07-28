<template>
  <div class="table-container">
    <span v-if="mensaje">{{ mensaje }}</span>
    <table>
      <thead>
        <tr>
          <th>Número de documento</th>
          <th>Identificación del cliente</th>
          <th>Nombre del cliente</th>
          <th>Cantidad de items</th>
          <th>Total impuestos</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{
            numeroDocumento,
            identificacionCliente,
            nombreCliente,
            cantidadItems,
            totalImpuestos,
            total,
          } in reportes"
          :key="numeroDocumento"
        >
          <td>{{ numeroDocumento }}</td>
          <td>{{ identificacionCliente }}</td>
          <td>{{ nombreCliente }}</td>
          <td>{{ cantidadItems }}</td>
          <td>{{ totalImpuestos }}</td>
          <td>{{ total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    reportes: {
      required: true,
      type: Array,
      default: [],
    },
    mensaje: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
  max-width: 1024px;
  margin: auto;
  margin-top: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

thead th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

thead th:hover {
  background: #e9ecef;
}

tbody td {
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

tbody tr:hover {
  background: #f8f9fa;
}

td:first-child {
  font-weight: 600;
}

td {
  font-weight: 500;
  text-align: right;
}

@media (max-width: 480px) {
  table {
    font-size: xx-small;
  }

  .table-container {
    padding: 0px;
  }
}

@media ((max-width: 768px)  and (min-width: 480px)) {
  table {
    font-size: small;
  }
}
</style>