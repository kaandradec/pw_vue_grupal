# Sistema de Facturación - Documentación

## Descripción General

Este módulo implementa las funcionalidades de facturación para la aplicación web responsiva, incluyendo la creación de facturas y la generación de reportes.

## Páginas Implementadas

### 1. Factura (`/factura`)
**Archivo:** `src/views/FacturaView.vue`

#### Funcionalidades:
- **Cabecera de Factura:**
  - RUC Empresa (ingresado por usuario)
  - Número de documento (ingresado por usuario)
  - Establecimiento (ingresado por usuario)
  - Punto de emisión (ingresado por usuario)
  - Fecha de emisión (autocompletada con fecha actual)

- **Identificación del Cliente:**
  - Búsqueda por cédula con autocompletado
  - Nombre del cliente (autocompletado)
  - Dirección (autocompletada)
  - Correo electrónico (autocompletado)

- **Detalle de Factura:**
  - Agregar múltiples productos/servicios
  - Búsqueda por código de barras con autocompletado
  - Cálculo automático de subtotales
  - Eliminación de ítems

- **Resumen de Factura:**
  - Subtotal (suma de todos los subtotales)
  - Total impuestos (IVA 12%)
  - TOTAL (subtotal + impuestos)

#### Características Técnicas:
- Formulario responsivo con validación
- Autocompletado de cliente y productos
- Cálculo automático de totales
- Mensajes de estado en tiempo real
- Diseño moderno y accesible

### 2. Reporte de Facturas (`/reportefactura`)
**Archivo:** `src/views/ReporteFacturasView.vue`

#### Funcionalidades:
- **Filtros y Búsqueda:**
  - Búsqueda por número de documento
  - Búsqueda por cliente (nombre o cédula)
  - Ordenamiento por múltiples criterios

- **Estadísticas en Tiempo Real:**
  - Total de facturas
  - Total de ventas
  - Total de impuestos
  - Promedio por factura

- **Tabla de Facturas:**
  - Número de documento
  - Identificación del cliente
  - Nombre del cliente
  - Cantidad de ítems
  - Total impuestos
  - TOTAL
  - Acciones (ver detalle, descargar)

- **Modal de Detalle:**
  - Vista detallada de cada factura
  - Información completa del cliente y montos

#### Características Técnicas:
- Tabla responsiva con ordenamiento
- Filtros en tiempo real
- Estadísticas dinámicas
- Modal para detalles
- Diseño moderno con gradientes

## Cliente API (`src/clients/facturaClients.js`)

### Endpoints Implementados:

#### Facturas:
- `guardarFacturaFachada(body)` - Crear nueva factura
- `consultarFacturaFachada(id)` - Obtener factura por ID
- `consultarFacturasFachada()` - Obtener todas las facturas
- `actualizarFacturaFachada(id, body)` - Actualizar factura
- `borrarFacturaFachada(id)` - Eliminar factura
- `buscarFacturaPorNumeroFachada(numeroDocumento)` - Buscar por número

#### Reportes:
- `obtenerReporteFacturasFachada()` - Obtener reporte de facturas

#### Autocompletado:
- `buscarClientePorCedulaFachada(cedula)` - Buscar cliente por cédula
- `buscarProductoPorCodigoBarrasFachada(codigoBarras)` - Buscar producto por código

## Estructura de Datos

### Factura:
```javascript
{
  rucEmpresa: "1234567890001",
  numeroDocumento: "001-001-000000001",
  establecimiento: "001",
  puntoEmision: "001",
  fechaEmision: "2024-01-15",
  cliente: { id: 1 },
  detalles: [
    {
      codigoBarras: "123456789",
      nombre: "Producto 1",
      cantidad: 2,
      precio: 50.00,
      subtotal: 100.00,
      producto: { id: 1 }
    }
  ]
}
```

### Reporte de Factura:
```javascript
{
  numeroDocumento: "001-001-000000001",
  identificacionCliente: "1234567890",
  nombreCliente: "Juan Pérez",
  cantidadItems: 2,
  totalImpuestos: 12.00,
  total: 112.00
}
```

## Características de Diseño

### Responsive Design:
- **Desktop:** Layout completo con todas las funcionalidades
- **Tablet:** Adaptación de columnas y controles
- **Mobile:** Diseño vertical optimizado para pantallas pequeñas

### UX/UI:
- **Colores:** Paleta moderna con azul primario (#007bff)
- **Tipografía:** Segoe UI para mejor legibilidad
- **Iconos:** Emojis para mejor experiencia visual
- **Animaciones:** Transiciones suaves y feedback visual
- **Accesibilidad:** Labels apropiados y navegación por teclado

### Validaciones:
- Campos requeridos marcados con asterisco (*)
- Validación de formato de cédula y códigos
- Mensajes de error y éxito en tiempo real
- Botón de guardar deshabilitado hasta completar campos obligatorios

## Integración con Backend

### URLs de API:
- **Base:** `http://localhost:8081/api/grupal/v1/`
- **Facturas:** `/facturas`
- **Reportes:** `/reportes`
- **Clientes:** `/clientes`
- **Productos:** `/productos`

### Manejo de Errores:
- Try-catch en todas las operaciones async
- Mensajes de error descriptivos
- Fallback para datos no encontrados
- Timeout para operaciones lentas

## Instalación y Uso

### Prerrequisitos:
- Node.js y npm instalados
- Backend corriendo en puerto 8081
- Dependencias de Vue.js instaladas

### Ejecución:
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run serve

# Acceder a las páginas
# http://localhost:8080/factura
# http://localhost:8080/reportefactura
```

## Funcionalidades Futuras

### Pendientes de Implementación:
- [ ] Descarga de facturas en PDF
- [ ] Impresión directa de facturas
- [ ] Filtros por fecha en reportes
- [ ] Exportación de reportes a Excel
- [ ] Historial de cambios en facturas
- [ ] Notificaciones por email

### Mejoras Sugeridas:
- [ ] Cache de productos y clientes frecuentes
- [ ] Autoguardado de facturas en borrador
- [ ] Plantillas de factura personalizables
- [ ] Dashboard con gráficos de ventas
- [ ] Integración con sistemas de pago

## Notas Técnicas

### Performance:
- Lazy loading de componentes
- Debounce en búsquedas
- Optimización de re-renders
- Compresión de assets

### Seguridad:
- Validación de datos en frontend y backend
- Sanitización de inputs
- Manejo seguro de errores
- CORS configurado correctamente

### Compatibilidad:
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móviles (iOS, Android)
- Resoluciones desde 320px hasta 4K

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades, contactar al equipo de desarrollo.

---

**Desarrollado con Vue.js 3 y Axios**
**Última actualización:** Enero 2024 