import {
  guardarBodegaFachada,
  consultarBodegasFachada,
  actualizarBodegaFachada,
  borrarBodegaFachada,
  consultarBodegaPorCodigoFachada,
} from "@/clients/BodegaClient";

export const obtenerTodasLasBodegas = async () => {
  try {
    const bodegas = await consultarBodegasFachada();
    return bodegas;
  } catch (error) {
    console.error("Error al obtener bodegas:", error);
    throw new Error("No se pudieron cargar las bodegas. Intenta de nuevo más tarde.");
  }
};

export const guardarOActualizarBodega = async (bodegaData, bodegasExistentes) => {
  if (bodegaData.codigo.length !== 6) {
    throw new Error("El código de la bodega debe tener exactamente 6 caracteres.");
  }

  const existe = bodegasExistentes.some(
    (bod) => bod.codigo === bodegaData.codigo && bod.id !== bodegaData.id
  );
  if (existe) {
    throw new Error("Ya existe una bodega con ese código. Por favor, elige uno diferente.");
  }

  try {
    if (bodegaData.id) {
      await actualizarBodegaFachada(bodegaData);
      return "Bodega actualizada correctamente.";
    } else {
      await guardarBodegaFachada(bodegaData);
      return "Bodega guardada correctamente.";
    }
  } catch (error) {
    console.error("Error al guardar/actualizar bodega:", error);
    throw new Error("Ocurrió un error al guardar la bodega. Verifica los datos e intenta nuevamente.");
  }
};

export const eliminarBodegaPorId = async (id) => {
  try {
    await borrarBodegaFachada(id);
    return "Bodega eliminada correctamente.";
  } catch (error) {
    console.error("Error al eliminar bodega:", error);
    throw new Error("Error al eliminar la bodega. Es posible que esté en uso.");
  }
};

export const buscarBodegaPorCodigo = async (codigo) => {
  try {
    const res = await consultarBodegaPorCodigoFachada(codigo);
    if (res && res.codigo === codigo) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar bodega por código:", error);
    throw new Error("No se pudo realizar la búsqueda de la bodega por código.");
  }
};