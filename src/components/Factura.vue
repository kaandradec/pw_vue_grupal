<template>
  <div class="factura-container">
    <div class="header">
      <h1>Ingresar Factura</h1>
    </div>

    <div class="factura-form">
      <CabeceraFactura
        :cabecera="cabecera"
        @cabecera-actualizada="actualizarCabecera"
      />

      <IdentificacionCliente
        ref="identificacionCliente"
        @cliente-encontrado="actualizarCliente"
        @mensaje="mostrarMensaje"
      />

      <DetalleFactura
        ref="detalleFactura"
        @detalles-cambiados="actualizarDetalles"
        @mensaje="mostrarMensaje"
      />

      <ResumenFactura :detalles="detalles" />

      <div class="actions">
        <button
          type="button"
          @click="guardarFactura"
          class="btn-save"
          :disabled="!esValida"
        >
          Guardar Factura
        </button>
        <button type="button" @click="limpiarFormulario" class="btn-clear">
          Limpiar
        </button>
      </div>
    </div>

    <div v-if="mensaje" :class="['mensaje', mensajeTipo]">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { guardarFacturaFachada } from "@/clients/facturaClients.js";
import CabeceraFactura from "./factura/CabeceraFactura.vue";
import IdentificacionCliente from "./factura/IdentificacionCliente.vue";
import DetalleFactura from "./factura/DetalleFactura.vue";
import ResumenFactura from "./factura/ResumenFactura.vue";

export default {
  name: "Factura",
  components: {
    CabeceraFactura,
    IdentificacionCliente,
    DetalleFactura,
    ResumenFactura,
  },
  data() {
    return {
      cabecera: {
        rucEmpresa: "",
        numeroDocumento: "",
        establecimiento: "",
        puntoEmision: "",
        fechaEmision: new Date().toISOString().split("T")[0],
      },
      cliente: null,
      detalles: [],
      mensaje: "",
      mensajeTipo: "success",
    };
  },
  computed: {
    esValida() {
      return (
        this.cabecera.rucEmpresa &&
        this.cabecera.numeroDocumento &&
        this.cabecera.establecimiento &&
        this.cabecera.puntoEmision &&
        this.cliente &&
        this.detalles.length > 0
      );
    },
  },
  methods: {
    actualizarCabecera(cabecera) {
      Object.assign(this.cabecera, cabecera);
    },
    actualizarCliente(cliente) {
      this.cliente = cliente;
    },
    actualizarDetalles(detalles) {
      this.detalles = detalles;
    },

    calcularSubtotal() {
      return this.detalles.reduce((total, item) => {
        return total + parseFloat(item.subtotal || 0);
      }, 0).toFixed(2);
    },

    calcularImpuestos() {
      return this.detalles.reduce((total, item) => {
        const cantidad = parseFloat(item.cantidad) || 0;
        const precio = parseFloat(item.precio) || 0;
        const impuesto = parseFloat(item.impuesto) || 0;
        return total + (cantidad * precio * (impuesto / 100));
      }, 0).toFixed(2);
    },

    calcularTotal() {
      const subtotal = parseFloat(this.calcularSubtotal()) || 0;
      const impuestos = parseFloat(this.calcularImpuestos()) || 0;
      return (subtotal + impuestos).toFixed(2);
    },

    async guardarFactura() {
      if (!this.esValida) {
        this.mostrarMensaje(
          "Por favor complete todos los campos requeridos",
          "error"
        );
        return;
      }

      const detallesValidos = this.detalles.every(
        (d) =>
          d.cantidad > 0 &&
          d.precio >= 0 &&
          typeof d.impuesto !== "undefined"
      );
      if (!detallesValidos) {
        this.mostrarMensaje("Hay detalles incompletos o inválidos", "error");
        return;
      }

      const facturaPlano = {
        ...this.cabecera,
        cliente: this.cliente,
        detalles: this.detalles,
        subtotal: this.calcularSubtotal(),
        totalImpuestos: this.calcularImpuestos(),
        total: this.calcularTotal(),
      };

      try {
        await guardarFacturaFachada(facturaPlano);
        this.mostrarMensaje("Factura guardada exitosamente", "success");
        this.limpiarFormulario();
      } catch (error) {
        this.mostrarMensaje("Error al guardar la factura", "error");
        console.error("❌ Error al guardar:", error);
      }

      console.log("🧾 Factura lista:", facturaPlano);
    },

    limpiarFormulario() {
      this.cabecera = {
        rucEmpresa: "",
        numeroDocumento: "",
        establecimiento: "",
        puntoEmision: "",
        fechaEmision: new Date().toISOString().split("T")[0],
      };
      this.cliente = null;
      this.detalles = [];
      if (this.$refs.identificacionCliente)
        this.$refs.identificacionCliente.limpiar();
      if (this.$refs.detalleFactura)
        this.$refs.detalleFactura.limpiar();
      this.mensaje = "";
    },

    mostrarMensaje(texto, tipo) {
      this.mensaje = texto;
      this.mensajeTipo = tipo;
      setTimeout(() => {
        this.mensaje = "";
      }, 3000);
    },
  },
};
</script>
<style scoped>
.factura-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

  .btn-save,
  .btn-clear {
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style> 