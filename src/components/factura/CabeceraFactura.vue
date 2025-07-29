<template>
  <div class="section">
    <h2>Cabecera de la Factura</h2>
    <div class="form-grid">
      <div class="form-group">
        <label for="rucEmpresa">RUC Empresa *</label>
        <input 
          type="text" 
          id="rucEmpresa" 
          v-model="cabecera.rucEmpresa" 
          placeholder="1234567890001"
          required
          @input="emitirCambios"
        />
      </div>
      <div class="form-group">
        <label for="numeroDocumento">Número de Documento *</label>
        <input 
          type="text" 
          id="numeroDocumento" 
          v-model="cabecera.numeroDocumento" 
          placeholder="001-001-000000001"
          required
          @input="emitirCambios"
        />
      </div>
      <div class="form-group">
        <label for="establecimiento">Establecimiento *</label>
        <input 
          type="text" 
          id="establecimiento" 
          v-model="cabecera.establecimiento" 
          placeholder="001"
          required
          @input="emitirCambios"
        />
      </div>
      <div class="form-group">
        <label for="puntoEmision">Punto de Emisión *</label>
        <input 
          type="text" 
          id="puntoEmision" 
          v-model="cabecera.puntoEmision" 
          placeholder="001"
          required
          @input="emitirCambios"
        />
      </div>
      <div class="form-group">
        <label for="fechaEmision">Fecha de Emisión</label>
        <input 
          type="date" 
          id="fechaEmision" 
          v-model="cabecera.fechaEmision" 
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CabeceraFactura',
  props: {
    cabecera: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitirCambios() {
      this.$emit('cabecera-cambiada', this.cabecera);
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .section {
    padding: 15px;
  }
}
</style> 