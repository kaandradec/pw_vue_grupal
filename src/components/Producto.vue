<template>
  <div class="container">
    <h1>Productos!</h1>

    <div class="buscar-section">
      <label for="productoId"> ID del Producto: </label>
      <input
        type="number"
        id="productoId"
        v-model="productoId"
        placeholder="Ingrese el ID para buscar o eliminar"
      />
      <button @click="consultar">Consultar</button>
      <button @click="borrar">Eliminar</button>
    </div>

    <!-- Formulario de producto -->
    <form @submit.prevent="guardar" class="formulario">
      <h2>
        {{ producto && producto.id ? " Editar Producto" : " Nuevo Producto" }}
      </h2>

      <div>
        <label for="codigoBarras">Codigo de Barras: </label>
        <input
          type="text"
          id="codigoBarras"
          v-model="productoForm.codigoBarras"
          required
        />
      </div>

      <div>
        <label for="categoria">Categoria: </label>
        <input
          type="text"
          id="categoria"
          v-model="productoForm.categoria"
          required
        />
      </div>

      <div>
        <label for="nombre">Nombre: </label>
        <input type="text" id="nombre" v-model="productoForm.nombre" required />
      </div>

      <div>
        <label for="precio"> Precio: </label>
        <input
          type="number"
          id="precio"
          v-model="productoForm.precio"
          required
        />
      </div>

      <div>
        <label for="stock">Stock: </label>
        <input type="number" id="stock" v-model="productoForm.stock" required />
      </div>

      <div class="impuestos-section">
        <label> Impuestos: </label>

        <div class="impuesto-item">
          <label for="iva">IVA (%)</label>
          <input
            type="number"
            id="iva"
            v-model="productoForm.iva"
            placeholder="Escribe el IVA"
            step="0.01"
          />
        </div>

        <div class="impuesto-item">
          <label for="ice">ICE (%)</label>
          <input
            type="number"
            id="ice"
            v-model="productoForm.ice"
            placeholder="Escribe el ICE"
            step="0.01"
          />
        </div>

        <div class="impuesto-item">
          <label for="isd">ISD (%)</label>
          <input
            type="number"
            id="isd"
            v-model="productoForm.isd"
            placeholder="Escribe el ISD"
            step="0.01"
          />
        </div>
      </div>

      <button type="submit">Guardar</button>
      <button type="button" @click="actualizar">Actualizar</button>
      <button type="button" @click="limpiarFormulario">Limpiar</button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    <!--  Detalle del producto consultado -->
    <div v-if="producto" class="producto-detalle">
      <h2>Datos del Producto</h2>
      <p><strong>ID:</strong> {{ producto.id }}</p>
      <p><strong>Codigo de Barras:</strong> {{ producto.codigoBarras }}</p>
      <p><strong>Categoria:</strong> {{ producto.categoria }}</p>
      <p><strong>Nombre:</strong> {{ producto.nombre }}</p>
      <p><strong>Precio:</strong> ${{ producto.precio }}</p>
      <p><strong>Stock:</strong> {{ producto.stock }}</p>
      <p><strong>IVA:</strong> {{ producto.iva || "No especificado" }}%</p>
      <p><strong>ICE:</strong> {{ producto.ice || "No especificado" }}%</p>
      <p><strong>ISD:</strong> {{ producto.isd || "No especificado" }}%</p>
    </div>

    <!--  Tabla de todos los productos -->
    <div v-if="listaProductos.length" class="tabla-productos">
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in listaProductos" :key="prod.id">
            <td>{{ prod.id }}</td>
            <td>{{ prod.nombre }}</td>
            <td>{{ prod.categoria }}</td>
            <td>${{ prod.precio }}</td>
            <td>{{ prod.stock }}</td>
            <td>
              <button @click="consultarPorId(prod.id)">Ver</button>
              <button @click="borrarPorId(prod.id)">Eliminar</button>
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

export default {
  data() {
    return {
      producto: null,
      mensaje: "",
      productoId: "",
      listaProductos: [],
      productoForm: {
        codigoBarras: "",
        categoria: "",
        nombre: "",
        precio: "",
        stock: "",
        iva: "",
        ice: "",
        isd: "",
      },
    };
  },
  async mounted() {
    await this.cargarListaProductos();
  },
  methods: {
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
          precio: this.producto.precio || "",
          stock: this.producto.stock || "",
          iva: this.producto.iva || "",
          ice: this.producto.ice || "",
          isd: this.producto.isd || "",
        };
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
      await G_ProductoFachada(this.productoForm);
      this.mensaje = "Producto guardado correctamente";
      this.limpiarFormulario();
      await this.cargarListaProductos();
    },

    async actualizar() {
      if (!this.producto || !this.producto.id) {
        this.mensaje = "Primero consulta un producto para actualizar";
        return;
      }

      await A_ProductoFachada(this.producto.id, this.productoForm);
      this.mensaje = "Producto actualizado correctamente";
      await this.cargarListaProductos();
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
        precio: "",
        stock: "",
        iva: "",
        ice: "",
        isd: "",
      };
      this.productoId = "";
      this.producto = null;
    },
  },
};
</script>

<style>
.container {
  width: 400px;
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

p {
  text-align: center;
  color: green;
  font-weight: bold;
}
</style>
