<template>
  <!-- <ReporteFacturas/> -->
  <div class="reportes-container">
    <ReporteFormularioFiltros @buscar="buscar($event)" />
    <ReporteTabla :reportes="reportes" />
  </div>
</template>

<script>
// import ReporteFacturas from "@/components/ReporteFacturas.vue"
import ReporteTabla from "@/components/reporte-factura/ReporteTabla.vue";
import ReporteFormularioFiltros from "@/components/reporte-factura/ReporteFormularioFiltros.vue";
import { buscarReportesFachada } from "@/clients/ReporteFacturaClient";

export default {
  data() {
    return {
      reportes: [
        // {
        //   numeroDocumento: "FAC-011231",
        //   identificacionCliente: "123123123",
        //   nombreCliente: "Fernanda Prado",
        //   cantidadItems: 2,
        //   totalImpuestos: 4.5,
        //   total: 25.0,
        // },
      ],
      mensaje: null,
    };
  },
  components: {
    // ReporteFacturas,
    ReporteTabla,
    ReporteFormularioFiltros,
  },
  methods: {
    async buscar(filtros) {
      console.log("Filtros:", filtros);
      let data = [];
      try {
        data = await buscarReportesFachada(filtros);
        console.log("DATA:", data);
      } catch (error) {
        console.error("Error al buscar reportes:", error);
        this.mensaje = "Error al buscar reportes. Intente nuevamente.";
      }

      if (data.length === 0) {
        this.reportes = [];
        this.mensaje =
          "No se encontraron reportes con los filtros proporcionados.";
        return;
      }

      this.reportes = data;
    },
  },
};
</script>

<style>
</style>