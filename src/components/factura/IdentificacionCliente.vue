<template>
  <div class="section">
    <h2>Datos del Cliente</h2>
    <div class="form-grid">
      <div class="form-group">
        <label for="cedulaCliente">Cédula del Cliente *</label>
        <div class="search-container">
          <input 
            type="text" 
            id="cedulaCliente" 
            v-model="cedulaCliente" 
            placeholder="1234567890"
            @blur="buscarCliente"
            required
          />
          <button type="button" @click="buscarCliente" class="search-btn">
            Buscar
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="nombreCliente">Nombre del Cliente</label>
        <input 
          type="text" 
          id="nombreCliente" 
          v-model="clienteInfo.nombre" 
          readonly
        />
      </div>
      <div class="form-group">
        <label for="direccionCliente">Dirección</label>
        <input 
          type="text" 
          id="direccionCliente" 
          v-model="clienteInfo.direccion" 
          readonly
        />
      </div>
      <div class="form-group">
        <label for="correoCliente">Correo Electrónico</label>
        <input 
          type="email" 
          id="correoCliente" 
          v-model="clienteInfo.correo" 
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
import { buscarClientePorCedulaFachada } from '@/clients/facturaClients.js';

export default {
  name: 'IdentificacionCliente',
  data() {
    return {
      cedulaCliente: '',
      clienteInfo: {
        nombre: '',
        direccion: '',
        correo: ''
      }
    };
  },
  methods: {
    async buscarCliente() {
      if (!this.cedulaCliente) return;
      
      try {
        const cliente = await buscarClientePorCedulaFachada(this.cedulaCliente);
        this.clienteInfo = {
          nombre: `${cliente.nombre} ${cliente.apellido}`,
          direccion: cliente.direccion,
          correo: cliente.email
          
        };
       
        this.$emit('cliente-encontrado', { id: cliente.id });
        this.$emit('mensaje', 'Cliente encontrado', 'success');
      } catch (error) {
        this.clienteInfo = { nombre: '', direccion: '', correo: '' };
        this.$emit('cliente-encontrado', null);
        this.$emit('mensaje', 'Cliente no encontrado', 'error');
         console.log("cliente"+ this.clienteInfo);
      }
       console.log("cliente"+ this.clienteInfo);
    },
    
    limpiar() {
      this.cedulaCliente = '';
      this.clienteInfo = {
        nombre: '',
        direccion: '',
        correo: ''
      };
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

.search-container {
  position: relative;
  display: flex;
}

.search-container input {
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-btn {
  padding: 12px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: pointer;
}

.search-btn:hover {
  background: #0056b3;
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
