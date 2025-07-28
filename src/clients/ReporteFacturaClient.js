import axios from "axios";

const URL_BASE = "http://localhost:8081/api/ventas/v1/reportes";

const buscarReportes = async (filtros) => {
  try {
    const response = await axios.get(URL_BASE, { params: filtros });
    return response.data;
  } catch (error) {
    console.error("Error al buscar reportes:", error);
    throw error;
  }
};

export const buscarReportesFachada = async (filtros) => {
  return buscarReportes(filtros);
};
