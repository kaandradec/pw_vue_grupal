<template>
  <div class="factura-container">
    <div class="header">
      <h1>Crear Factura</h1>
    </div>

    <div class="factura-form">
      <!-- Cabecera de la Factura -->
      <CabeceraFactura 
        :cabecera="factura.cabecera"
        @cabecera-cambiada="actualizarCabecera"
      />

      <!-- Identificación del Cliente -->
      <IdentificacionCliente 
        ref="identificacionCliente"
        @cliente-encontrado="actualizarCliente"
        @mensaje="mostrarMensaje"
      />

      <!-- Detalle de la Factura -->
      <DetalleFactura 
        ref="detalleFactura"
        @detalles-cambiados="actualizarDetalles"
        @mensaje="mostrarMensaje"
      />

      <!-- Resumen de la Factura -->
      <ResumenFactura 
        :detalles="factura.detalles"
      />

      <!-- Botones de Acción -->
      <div class="actions">
        <button type="button" @click="guardarFactura" class="btn-save" :disabled="!esValida">
          💾 Guardar Factura
        </button>
        <button type="button" @click="limpiarFormulario" class="btn-clear">
          🗑️ Limpiar
        </button>
      </div>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="mensaje" :class="['mensaje', mensajeTipo]">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { guardarFacturaFachada } from '@/clients/facturaClients.js';
import CabeceraFactura from './factura/CabeceraFactura.vue';
import IdentificacionCliente from './factura/IdentificacionCliente.vue';
import DetalleFactura from './factura/DetalleFactura.vue';
import ResumenFactura from './factura/ResumenFactura.vue';

export default {
  name: 'Factura',
  components: {
    CabeceraFactura,
    IdentificacionCliente,
    DetalleFactura,
    ResumenFactura
  },
  data() {
    return {
      factura: {
        cabecera: {
          rucEmpresa: '',
          numeroDocumento: '',
          establecimiento: '',
          puntoEmision: '',
          fechaEmision: new Date().toISOString().split('T')[0]
        },
        cliente: null,
        detalles: []
      },
      mensaje: '',
      mensajeTipo: 'success'
    };
  },
  computed: {
    esValida() {
      return this.factura.cabecera.rucEmpresa && 
             this.factura.cabecera.numeroDocumento && 
             this.factura.cabecera.establecimiento && 
             this.factura.cabecera.puntoEmision && 
             this.factura.cliente && 
             this.factura.detalles.length > 0;
    }
  },
  methods: {
    actualizarCabecera(cabecera) {
      this.factura.cabecera = cabecera;
    },
    
    actualizarCliente(cliente) {
      this.factura.cliente = cliente;
    },
    
    actualizarDetalles(detalles) {
      this.factura.detalles = detalles;
    },
    
    async guardarFactura() {
      if (!this.esValida) {
        this.mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
        return;
      }
      
      try {
        await guardarFacturaFachada(this.factura);
        this.mostrarMensaje('Factura guardada exitosamente', 'success');
        this.limpiarFormulario();
      } catch (error) {
        this.mostrarMensaje('Error al guardar la factura', 'error');
      }
    },
    
    limpiarFormulario() {
      this.factura = {
        cabecera: {
          rucEmpresa: '',
          numeroDocumento: '',
          establecimiento: '',
          puntoEmision: '',
          fechaEmision: new Date().toISOString().split('T')[0]
        },
        cliente: null,
        detalles: []
      };
      
      // Limpiar componentes hijos usando refs
      if (this.$refs.identificacionCliente) {
        this.$refs.identificacionCliente.limpiar();
      }
      if (this.$refs.detalleFactura) {
        this.$refs.detalleFactura.limpiar();
      }
      
      this.mensaje = '';
    },
    
    mostrarMensaje(texto, tipo) {
      this.mensaje = texto;
      this.mensajeTipo = tipo;
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
.factura-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 0;
}

.factura-form {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 25px;
}

.btn-save {
  background: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.btn-save:hover:not(:disabled) {
  background: #0056b3;
}

.btn-save:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-clear {
  background: #6c757d;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.btn-clear:hover {
  background: #545b62;
}

.mensaje {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
}

.mensaje.success {
  background: #28a745;
}

.mensaje.error {
  background: #dc3545;
}



/* Responsive Design */
@media (max-width: 768px) {
  .factura-container {
    padding: 10px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .btn-save, .btn-clear {
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style> 