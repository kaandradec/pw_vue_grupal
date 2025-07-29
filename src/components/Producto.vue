<template>
  <div class="container">
    <h1>Gestión de Productos</h1>
    <p>¡Bienvenido!</p>

    <!-- Sección para buscar o eliminar un producto -->
    <div class="buscar-section">
      <label for="productoId">ID del Producto:</label>
      <input
        type="number"
        id="productoId"
        v-model="productoId"
        placeholder="Escribe un ID para buscar o eliminar"
      />
      <button @click="consultar">Buscar Producto</button>
      <button @click="borrar">Eliminar Producto</button>
    </div>

    <!-- Formulario para crear o editar productos -->
    <form @submit.prevent="guardar" class="formulario">
      <h2>
        {{ producto && producto.id ? "Editar Producto" : "Nuevo Producto" }}
      </h2>

      <div>
        <label for="codigoBarras">Código de Barras:</label>
        <input
          type="text"
          id="codigoBarras"
          v-model="productoForm.codigoBarras"
          required
        />
      </div>

      <div>
        <label for="categoria">Categoría:</label>
        <input
          type="text"
          id="categoria"
          v-model="productoForm.categoria"
          required
        />
      </div>

      <div>
        <label for="nombre">Nombre del Producto:</label>
        <input type="text" id="nombre" v-model="productoForm.nombre" required />
      </div>

      <div>
        <label for="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          v-model="productoForm.precio"
          required
        />
      </div>

      <div>
        <label for="stock">Stock disponible:</label>
        <input type="number" id="stock" v-model="productoForm.stock" required />
      </div>

      <!-- Impuestos -->
      <div class="impuestos-section">
        <label>Impuestos:</label>
        <div
          class="impuesto-item"
          v-for="(imp, idx) in productoForm.impuestos"
          :key="idx"
        >
          <select
            v-model="imp.idImpuesto"
            @change="actualizarPorcentaje(idx)"
            required
          >
            <option disabled value="">-- Selecciona un impuesto --</option>
            <option
              v-for="impOption in listaImpuestos"
              :key="impOption.id"
              :value="impOption.id"
            >
              {{ impOption.nombre }} ({{ impOption.porcentaje }}%) - Código:
              {{ impOption.codigo }}
            </option>
          </select>
          <input
            type="number"
            v-model="imp.porcentaje"
            placeholder="Porcentaje"
            step="0.01"
            min="0"
            required
            readonly
          />
          <button type="button" @click="eliminarImpuesto(idx)">Quitar</button>
        </div>
        <button type="button" @click="agregarImpuesto">Agregar Impuesto</button>
      </div>

      <div class="acciones">
        <button type="submit">Guardar</button>
        <button type="button" @click="actualizar">Actualizar</button>
        <button type="button" @click="limpiarFormulario">Limpiar</button>
      </div>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    <!-- Datos del producto consultado -->
    <div v-if="producto" class="producto-detalle">
      <h2>Detalles del Producto</h2>
      <p><strong>ID:</strong> {{ producto.id }}</p>
      <p><strong>Código de Barras:</strong> {{ producto.codigoBarras }}</p>
      <p><strong>Categoría:</strong> {{ producto.categoria }}</p>
      <p><strong>Nombre:</strong> {{ producto.nombre }}</p>
      <p><strong>Precio:</strong> ${{ producto.precio }}</p>
      <p><strong>Stock:</strong> {{ producto.stock }}</p>
      <div>
        <strong>Impuesto Principal:</strong>
        <p v-if="impuestoPrincipal">
          {{ impuestoPrincipal.nombre }} - {{ impuestoPrincipal.porcentaje }}%
        </p>
        <p v-else>No hay impuestos asociados</p>
      </div>
    </div>

    <!-- Tabla de productos -->
    <div v-if="listaProductos.length" class="tabla-productos">
      <h2>Todos los Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CB</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in listaProductos" :key="prod.id">
            <td>{{ prod.id }}</td>
            <td>{{ prod.codigoBarras }}</td>
            <td>{{ prod.nombre }}</td>
            <td>{{ prod.categoria }}</td>
            <td>${{ prod.precio }}</td>
            <td>{{ prod.stock }}</td>
            <td>
              <button @click="consultarPorId(prod.id)">Ver</button>
              <button @click="borrarPorId(prod.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  C_ProductoFachada,
  G_ProductoFachada,
  A_ProductoFachada,
  EProductoFachada,
  L_ProductosFachada,
} from "@/clients/productoClients";
import { L_ImpuestosFachada } from "@/clients/impuestoClients";

export default {
  data() {
    return {
      productoId: null,
      producto: null,
      productoImpuestos: [],
      mensaje: "",
      listaProductos: [],
      listaImpuestos: [],
      productoForm: {
        codigoBarras: "",
        categoria: "",
        nombre: "",
        precio: 0,
        stock: 0,
        impuestos: [],
      },
    };
  },
  async mounted() {
    await this.cargarListaImpuestos();
    await this.cargarListaProductos();
  },
  methods: {
    async cargarListaImpuestos() {
      this.listaImpuestos = await L_ImpuestosFachada();
      console.log("Impuestos cargados:", this.listaImpuestos);
    },
    agregarImpuesto() {
      this.productoForm.impuestos.push({ idImpuesto: "", porcentaje: 0 });
    },
    eliminarImpuesto(idx) {
      this.productoForm.impuestos.splice(idx, 1);
    },
    actualizarPorcentaje(idx) {
      const id = this.productoForm.impuestos[idx].idImpuesto;
      const impData = this.listaImpuestos.find((i) => i.id === id);
      if (impData) {
        this.productoForm.impuestos[idx].porcentaje = impData.porcentaje;
      }
    },
    async cargarListaProductos() {
      this.listaProductos = await L_ProductosFachada();
    },
    async consultar() {
      if (!this.productoId) {
        this.mensaje = " Por favor ingrese un ID para consultar";
        return;
      }
      this.producto = await C_ProductoFachada(this.productoId);
      if (this.producto) {
        this.productoForm = {
          codigoBarras: this.producto.codigoBarras || "",
          categoria: this.producto.categoria || "",
          nombre: this.producto.nombre || "",
          precio: this.producto.precio || 0,
          stock: this.producto.stock || 0,
          impuestos: this.producto.impuestos
            ? this.producto.impuestos.map((imp) => ({
                idImpuesto: imp.id,
                porcentaje: imp.porcentaje,
              }))
            : [],
        };

        // Asignamos la copia limpia para mostrar los nombres
        this.productoImpuestos = this.producto.impuestos || [];

        this.mensaje = "Producto consultado correctamente";
      } else {
        this.mensaje = "Producto no encontrado";
      }
    },
    async consultarPorId(id) {
      this.productoId = id;
      await this.consultar();
    },
    async guardar() {
      const productoParaGuardar = {
        ...this.productoForm,
        impuestos:
          this.productoForm.impuestos.length > 0
            ? [{ id: this.productoForm.impuestos[0].idImpuesto }]
            : [],
      };
      delete productoParaGuardar.id;

      await G_ProductoFachada(productoParaGuardar);
      this.mensaje = "Producto guardado correctamente";
      this.limpiarFormulario();
      await this.cargarListaProductos();
    },
    async actualizar() {
      if (!this.producto || !this.producto.id) {
        this.mensaje = "Primero consulta un producto para actualizar";
        return;
      }
      const productoParaActualizar = {
        codigoBarras: this.productoForm.codigoBarras,
        categoria: this.productoForm.categoria,
        nombre: this.productoForm.nombre,
        precio: Number(this.productoForm.precio),
        stock: Number(this.productoForm.stock),
        impuestos: this.productoForm.impuestos.map((imp) => ({
          id: imp.idImpuesto,
        })),
      };

      try {
        const productoParaActualizar = {
          ...this.productoForm,
          impuestos:
            this.productoForm.impuestos.length > 0
              ? [{ id: this.productoForm.impuestos[0].idImpuesto }]
              : [],
        };

        await A_ProductoFachada(this.producto.id, productoParaActualizar);
        this.mensaje = "Producto actualizado correctamente";
        await this.cargarListaProductos();
      } catch (error) {
        this.mensaje =
          "Error al actualizar producto: " +
          (error.response?.data || error.message || "Error desconocido");
      }
    },

    async borrar() {
      if (!this.productoId) {
        this.mensaje = " Por favor ingrese un ID para eliminar";
        return;
      }
      await EProductoFachada(this.productoId);
      this.mensaje = "🗑 Producto eliminado correctamente";
      this.producto = null;
      await this.cargarListaProductos();
    },
    async borrarPorId(id) {
      await EProductoFachada(id);
      this.mensaje = `🗑 Producto con ID ${id} eliminado correctamente`;
      if (this.producto && this.producto.id === id) {
        this.producto = null;
        this.limpiarFormulario();
      }
      await this.cargarListaProductos();
    },
    limpiarFormulario() {
      this.productoForm = {
        codigoBarras: "",
        categoria: "",
        nombre: "",
        precio: 0,
        stock: 0,
        impuestos: [],
      };
      this.productoId = "";
      this.producto = null;
      this.productoImpuestos = [];
    },
  },
  computed: {
    impuestoPrincipal() {
      if (
        this.producto &&
        this.producto.impuestos &&
        this.producto.impuestos.length > 0
      ) {
        return this.producto.impuestos.reduce((max, imp) =>
          imp.porcentaje > max.porcentaje ? imp : max
        );
      }
      return null;
    },
  },
};
</script>

<style scoped>
.container {
  width: 500px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
}

.impuestos-section {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 3px;
  background-color: #fff;
}

.impuesto-item {
  margin-bottom: 8px;
}

button {
  padding: 5px 10px;
  margin: 5px 2px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul,
p {
  text-align: center;
  color: green;
  font-weight: bold;
}

/* Mejoras para la tabla de productos */
.tabla-productos {
  margin-top: 20px;
  margin-bottom: 20px;
}

.tabla-productos table {
  width: 100%;
  border-collapse: collapse;
}

.tabla-productos th,
.tabla-productos td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.tabla-productos th {
  background-color: #f0f0f0;
}

.tabla-productos tr:hover {
  background-color: #e6f7ff;
}

/* Separar formulario del contenido siguiente */
.formulario {
  margin-bottom: 30px;
}
</style>
