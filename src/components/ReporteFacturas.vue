<template>
  <div class="reporte-container">
    <div class="header">
      <h1>Reporte de Facturas</h1>
    </div>

    <div class="reporte-content">
      <!-- Filtros y Controles -->
      <div class="filtros-section">
        <div class="filtros-grid">
          <div class="filtro-grupo">
            <label for="buscarNumero">Buscar por Número:</label>
            <div class="search-container">
              <input 
                type="text" 
                id="buscarNumero" 
                v-model="filtroNumero" 
                placeholder="001-001-000000001"
                @input="filtrarFacturas"
              />
              <button type="button" @click="buscarPorNumero" class="search-btn">
                🔍
              </button>
            </div>
          </div>
          <div class="filtro-grupo">
            <label for="buscarCliente">Buscar por Cliente:</label>
            <input 
              type="text" 
              id="buscarCliente" 
              v-model="filtroCliente" 
              placeholder="Nombre o cédula del cliente"
              @input="filtrarFacturas"
            />
          </div>
          <div class="filtro-grupo">
            <label for="ordenarPor">Ordenar por:</label>
            <select id="ordenarPor" v-model="ordenarPor" @change="ordenarFacturas">
              <option value="fecha">Fecha de Emisión</option>
              <option value="numero">Número de Documento</option>
              <option value="cliente">Cliente</option>
              <option value="total">Total</option>
            </select>
          </div>
          <div class="filtro-grupo">
            <button type="button" @click="cargarFacturas" class="btn-refresh">
              Actualizar
            </button>
          </div>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <!-- <div class="stat-icon">📄</div> -->
            <div class="stat-content">
              <h3>Total Facturas</h3>
              <p>{{ facturasFiltradas.length }}</p>
            </div>
          </div>
          <div class="stat-card">
            <!-- <div class="stat-icon">💰</div> -->
            <div class="stat-content">
              <h3>Total Ventas</h3>
              <p>${{ totalVentas.toFixed(2) }}</p>
            </div>
          </div>
          <div class="stat-card">
            <!-- <div class="stat-icon">📊</div> -->
            <div class="stat-content">
              <h3>Total Impuestos</h3>
              <p>${{ totalImpuestos.toFixed(2) }}</p>
            </div>
          </div>
          <div class="stat-card">
            <!-- <div class="stat-icon">📈</div> -->
            <div class="stat-content">
              <h3>Promedio por Factura</h3>
              <p>${{ promedioFactura.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Facturas -->
      <div class="tabla-section">
        <div class="tabla-header">
          <h2>Lista de Facturas</h2>
          <div class="tabla-controls">
            <span class="resultados-info">
              Mostrando {{ facturasFiltradas.length }} de {{ facturas.length }} facturas
            </span>
          </div>
        </div>

        <div class="tabla-container">
          <table class="facturas-tabla">
            <thead>
              <tr>
                <th @click="ordenarPorColumna('numeroDocumento')">
                  Número de Documento
                  <span class="sort-icon">{{ getSortIcon('numeroDocumento') }}</span>
                </th>
                <th @click="ordenarPorColumna('identificacionCliente')">
                  Identificación Cliente
                  <span class="sort-icon">{{ getSortIcon('identificacionCliente') }}</span>
                </th>
                <th @click="ordenarPorColumna('nombreCliente')">
                  Nombre del Cliente
                  <span class="sort-icon">{{ getSortIcon('nombreCliente') }}</span>
                </th>
                <th @click="ordenarPorColumna('cantidadItems')">
                  Cantidad de Ítems
                  <span class="sort-icon">{{ getSortIcon('cantidadItems') }}</span>
                </th>
                <th @click="ordenarPorColumna('totalImpuestos')">
                  Total Impuestos
                  <span class="sort-icon">{{ getSortIcon('totalImpuestos') }}</span>
                </th>
                <th @click="ordenarPorColumna('total')">
                  TOTAL
                  <span class="sort-icon">{{ getSortIcon('total') }}</span>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="factura in facturasFiltradas" :key="factura.numeroDocumento" class="factura-row">
                <td class="numero-doc">{{ factura.numeroDocumento }}</td>
                <td>{{ factura.identificacionCliente }}</td>
                <td class="nombre-cliente">{{ factura.nombreCliente }}</td>
                <td class="cantidad-items">{{ factura.cantidadItems }}</td>
                <td class="impuestos">${{ parseFloat(factura.totalImpuestos).toFixed(2) }}</td>
                <td class="total">${{ parseFloat(factura.total).toFixed(2) }}</td>
                <td class="acciones">
                  <button 
                    type="button" 
                    @click="verDetalle(factura)" 
                    class="btn-ver"
                    title="Ver detalle"
                  >
                    👁️
                  </button>
                  <button 
                    type="button" 
                    @click="descargarFactura(factura)" 
                    class="btn-download"
                    title="Descargar"
                  >
                    📥
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mensaje cuando no hay facturas -->
          <div v-if="facturasFiltradas.length === 0" class="no-data">
            <!-- <div class="no-data-icon">📋</div> -->
            <h3>No se encontraron facturas</h3>
            <p>No hay facturas que coincidan con los filtros aplicados.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalle -->
    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detalle de Factura</h3>
          <button type="button" @click="cerrarModal" class="btn-close">×</button>
        </div>
        <div class="modal-body" v-if="facturaSeleccionada">
          <div class="detalle-grid">
            <div class="detalle-item">
              <label>Número de Documento:</label>
              <span>{{ facturaSeleccionada.numeroDocumento }}</span>
            </div>
            <div class="detalle-item">
              <label>Cliente:</label>
              <span>{{ facturaSeleccionada.nombreCliente }}</span>
            </div>
            <div class="detalle-item">
              <label>Identificación:</label>
              <span>{{ facturaSeleccionada.identificacionCliente }}</span>
            </div>
            <div class="detalle-item">
              <label>Cantidad de Ítems:</label>
              <span>{{ facturaSeleccionada.cantidadItems }}</span>
            </div>
            <div class="detalle-item">
              <label>Total Impuestos:</label>
              <span>${{ parseFloat(facturaSeleccionada.totalImpuestos).toFixed(2) }}</span>
            </div>
            <div class="detalle-item">
              <label>TOTAL:</label>
              <span class="total-modal">${{ parseFloat(facturaSeleccionada.total).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="mensaje" :class="['mensaje', mensajeTipo]">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { obtenerReporteFacturasFachada, buscarFacturaPorNumeroFachada } from '@/clients/facturaClients.js';

export default {
  name: 'ReporteFacturas',
  data() {
    return {
      facturas: [],
      facturasFiltradas: [],
      filtroNumero: '',
      filtroCliente: '',
      ordenarPor: 'fecha',
      ordenAscendente: true,
      columnaOrden: 'numeroDocumento',
      mostrarModal: false,
      facturaSeleccionada: null,
      mensaje: '',
      mensajeTipo: 'success',
      cargando: false
    };
  },
  computed: {
    totalVentas() {
      return this.facturasFiltradas.reduce((sum, factura) => {
        return sum + parseFloat(factura.total);
      }, 0);
    },
    totalImpuestos() {
      return this.facturasFiltradas.reduce((sum, factura) => {
        return sum + parseFloat(factura.totalImpuestos);
      }, 0);
    },
    promedioFactura() {
      if (this.facturasFiltradas.length === 0) return 0;
      return this.totalVentas / this.facturasFiltradas.length;
    }
  },
  async mounted() {
    await this.cargarFacturas();
  },
  methods: {
    async cargarFacturas() {
      this.cargando = true;
      try {
        this.facturas = await obtenerReporteFacturasFachada();
        this.filtrarFacturas();
        this.mostrarMensaje('Reporte cargado exitosamente', 'success');
      } catch (error) {
        this.mostrarMensaje('Error al cargar el reporte', 'error');
        console.error('Error cargando facturas:', error);
      } finally {
        this.cargando = false;
      }
    },

    filtrarFacturas() {
      let filtradas = [...this.facturas];

      // Filtrar por número de documento
      if (this.filtroNumero) {
        filtradas = filtradas.filter(factura => 
          factura.numeroDocumento.toLowerCase().includes(this.filtroNumero.toLowerCase())
        );
      }

      // Filtrar por cliente
      if (this.filtroCliente) {
        filtradas = filtradas.filter(factura => 
          factura.nombreCliente.toLowerCase().includes(this.filtroCliente.toLowerCase()) ||
          factura.identificacionCliente.includes(this.filtroCliente)
        );
      }

      this.facturasFiltradas = filtradas;
      this.ordenarFacturas();
    },

    async buscarPorNumero() {
      if (!this.filtroNumero) return;
      
      try {
        const factura = await buscarFacturaPorNumeroFachada(this.filtroNumero);
        this.facturasFiltradas = [factura];
        this.mostrarMensaje('Factura encontrada', 'success');
      } catch (error) {
        this.mostrarMensaje('Factura no encontrada', 'error');
        this.filtrarFacturas();
      }
    },

    ordenarFacturas() {
      this.facturasFiltradas.sort((a, b) => {
        let valorA, valorB;

        switch (this.columnaOrden) {
          case 'numeroDocumento':
            valorA = a.numeroDocumento;
            valorB = b.numeroDocumento;
            break;
          case 'identificacionCliente':
            valorA = a.identificacionCliente;
            valorB = b.identificacionCliente;
            break;
          case 'nombreCliente':
            valorA = a.nombreCliente;
            valorB = b.nombreCliente;
            break;
          case 'cantidadItems':
            valorA = parseInt(a.cantidadItems);
            valorB = parseInt(b.cantidadItems);
            break;
          case 'totalImpuestos':
            valorA = parseFloat(a.totalImpuestos);
            valorB = parseFloat(b.totalImpuestos);
            break;
          case 'total':
            valorA = parseFloat(a.total);
            valorB = parseFloat(b.total);
            break;
          default:
            valorA = a.numeroDocumento;
            valorB = b.numeroDocumento;
        }

        if (this.ordenAscendente) {
          return valorA > valorB ? 1 : -1;
        } else {
          return valorA < valorB ? 1 : -1;
        }
      });
    },

    ordenarPorColumna(columna) {
      if (this.columnaOrden === columna) {
        this.ordenAscendente = !this.ordenAscendente;
      } else {
        this.columnaOrden = columna;
        this.ordenAscendente = true;
      }
      this.ordenarFacturas();
    },

    getSortIcon(columna) {
      if (this.columnaOrden !== columna) return '↕️';
      return this.ordenAscendente ? '↑' : '↓';
    },

    verDetalle(factura) {
      this.facturaSeleccionada = factura;
      this.mostrarModal = true;
    },

    cerrarModal() {
      this.mostrarModal = false;
      this.facturaSeleccionada = null;
    },

    descargarFactura(factura) {
      // Aquí se implementaría la lógica para descargar la factura
      this.mostrarMensaje('Función de descarga en desarrollo', 'success');
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
.reporte-container {
  max-width: 1400px;
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

.reporte-content {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Filtros */
.filtros-section {
  padding: 25px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.filtros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-items: end;
}

.filtro-grupo {
  display: flex;
  flex-direction: column;
}

.filtro-grupo label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
}

.filtro-grupo input,
.filtro-grupo select {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
}

.filtro-grupo input:focus,
.filtro-grupo select:focus {
  outline: none;
  border-color: #007bff;
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

.btn-refresh {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-refresh:hover {
  background: #218838;
}

/* Estadísticas */
.stats-section {
  padding: 25px;
  background: #667eea;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.stat-content h3 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.stat-content p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Tabla */
.tabla-section {
  padding: 25px;
}

.tabla-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tabla-header h2 {
  margin: 0;
  color: #495057;
}

.resultados-info {
  color: #6c757d;
  font-size: 14px;
}

.tabla-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.facturas-tabla {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.facturas-tabla th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  cursor: pointer;
  position: relative;
}

.facturas-tabla th:hover {
  background: #e9ecef;
}

.sort-icon {
  margin-left: 5px;
  font-size: 12px;
}

.facturas-tabla td {
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.factura-row:hover {
  background: #f8f9fa;
}

.numero-doc {
  font-weight: 600;
  color: #007bff;
}

.nombre-cliente {
  font-weight: 500;
}

.cantidad-items {
  text-align: center;
  font-weight: 600;
}

.impuestos,
.total {
  text-align: right;
  font-weight: 600;
}

.total {
  color: #28a745;
}

.acciones {
  text-align: center;
  white-space: nowrap;
}

.btn-ver,
.btn-download {
  background: none;
  border: none;
  padding: 8px;
  margin: 0 2px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-ver:hover {
  background: #e3f2fd;
}

.btn-download:hover {
  background: #e8f5e8;
}

/* No data */
.no-data {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.no-data h3 {
  margin: 0 0 10px 0;
  color: #495057;
}

.no-data p {
  margin: 0;
  font-size: 16px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #495057;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.btn-close:hover {
  background: #f8f9fa;
}

.modal-body {
  padding: 25px;
}

.detalle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.detalle-item {
  display: flex;
  flex-direction: column;
}

.detalle-item label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 5px;
}

.detalle-item span {
  color: #6c757d;
  font-size: 16px;
}

.total-modal {
  color: #28a745 !important;
  font-weight: bold;
  font-size: 18px !important;
}

/* Mensajes */
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
  .reporte-container {
    padding: 10px;
  }
  
  .filtros-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tabla-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .facturas-tabla {
    font-size: 14px;
  }
  
  .facturas-tabla th,
  .facturas-tabla td {
    padding: 8px 6px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .detalle-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
  
  .facturas-tabla {
    font-size: 12px;
  }
  
  .btn-ver,
  .btn-download {
    padding: 6px;
    margin: 0 1px;
  }
}
</style> 