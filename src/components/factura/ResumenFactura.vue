<template>
  <div class="section">
    <h2>Resumen de la Factura</h2>
    <div class="resumen-container">
      <div class="resumen-item">
        <span>Subtotal:</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="resumen-item">
        <span>Total Impuestos:</span>
        <span>${{ totalImpuestos.toFixed(2) }}</span>
      </div>
      <div class="resumen-item total">
        <span>TOTAL:</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumenFactura',
  props: {
    detalles: {
      type: Array,
      required: true
    }
  },
  computed: {
    subtotal() {
      return this.detalles.reduce((sum, detalle) => {
        return sum + (parseFloat(detalle.subtotal) || 0);
      }, 0);
    },
    totalImpuestos() {
      return this.detalles.reduce((sum, detalle) => {
        const subtotal = parseFloat(detalle.subtotal) || 0;
        const impuestos = subtotal * 0.12; // IVA 12%
        return sum + impuestos;
      }, 0);
    },
    total() {
      return this.subtotal + this.totalImpuestos;
    }
  }
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

.resumen-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.resumen-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
  font-size: 16px;
}

.resumen-item:last-child {
  border-bottom: none;
}

.resumen-item.total {
  font-weight: bold;
  font-size: 18px;
  color: #007bff;
  border-top: 2px solid #007bff;
  margin-top: 10px;
  padding-top: 15px;
}

@media (max-width: 768px) {
  .resumen-item {
    flex-direction: column;
    text-align: center;
    gap: 5px;
  }
  
  .section {
    padding: 15px;
  }
}
</style> 