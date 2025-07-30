<template>
  <div class="section">
    <div class="form-grid">
      <div class="form-group">
        <label for="rucEmpresa">RUC Empresa *</label>
        <input 
          type="text" 
          id="rucEmpresa" 
          v-model="cabeceraLocal.rucEmpresa" 
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
          v-model="cabeceraLocal.numeroDocumento" 
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
          v-model="cabeceraLocal.establecimiento" 
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
          v-model="cabeceraLocal.puntoEmision" 
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
          v-model="cabeceraLocal.fechaEmision" 
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
  data() {
  return {
    cabeceraLocal: { ...this.cabecera } // copia limpia
  };
},
 methods: {
  emitirCambios() {
    this.$emit('cabecera-actualizada', { ...this.cabeceraLocal }); // copia limpia
    console.log(" cabecera emitida:", this.cabeceraLocal);
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  text-align: left;
  font-weight: 500;
  margin-bottom: 5px;
  color: #495057;
}

.form-group input {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 12px;
  width: 160px;
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