<template>
  <div class="container">
    <div class="form-container">
      <div class="filtros">
        <p type="Número de documento">
          <input type="text" v-model="numeroDocumento" />
        </p>
        <p type="Identificación del cliente">
          <input type="text" v-model="identificacionCliente" />
        </p>
        <p type="Fecha Inicio">
          <input type="date" v-model="fechaInicio" />
        </p>
        <p type="Fecha Fin">
          <input type="date" v-model="fechaFin" />
        </p>
      </div>
      <div class="btns-container">
        <button @click="limpiarDatos()">Resetear Filtros</button>
        <button @click="buscar()">Buscar Reportes</button>
      </div>
    </div>
    <span v-if="mensaje">{{ mensaje }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numeroDocumento: null,
      identificacionCliente: null,
      fechaInicio: null,
      fechaFin: null,
      mensaje: null,
    };
  },
  methods: {
    buscar() {
      this.mensaje = null;
      if (!this.validar()) {
        return;
      }

      const filtros = {
        numeroDocumento: this.numeroDocumento,
        identificacionCliente: this.identificacionCliente,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
      };

      this.$emit("buscar", filtros);
      this.limpiarDatos();
    },
    validar() {
      // Si NO se quiere buscar con fechas
      if (this.fechaInicio === null && this.fechaFin === null) {
        return true;
      }

      // Si se quiere buscar con fechas validar que la fechaInicio no sea mayor que fechaFin
      if (this.fechaInicio !== null || this.fechaFin !== null) {
        if (this.fechaInicio === null || this.fechaFin === null) {
          this.mensaje = "Debe ingresar ambas fechas.";
          return false;
        }
        if (
          this.fechaInicio !== null &&
          this.fechaFin !== null &&
          this.fechaInicio > this.fechaFin
        ) {
          this.mensaje =
            "La fecha de inicio no puede ser mayor que la fecha final.";
          return false;
        }
      }

      return true;
    },
    limpiarDatos() {
      this.numeroDocumento = null;
      this.identificacionCliente = null;
      this.fechaInicio = null;
      this.fechaFin = null;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 16px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}
.form-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

p {
  margin: 0;
  color: #495057;
}

p:before {
  content: attr(type);
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
  font-size: 14px;
}

.filtros {
  display: flex;
  gap: 16px;
}

input {
  padding: 12px;
  box-sizing: border-box; /* Añadir esta línea para solucionar error visual por usar padding en input */
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.btns-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

button {
  background-color: #00cb70;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.btns-container :nth-child(2) {
  background-color: #007bff;
}

.btns-container :nth-child(2):hover {
  background-color: #0056b3;
}

span {
  color: red;
}

@media (max-width: 840px) {
  .form-container {
    flex-direction: column;
  }

  .btns-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .filtros {
    flex-wrap: wrap;
  }

  p,
  input {
    width: 100%;
  }
}
</style>