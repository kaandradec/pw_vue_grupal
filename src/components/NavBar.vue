<template>
  <div class="navbar-container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/bodega">Bodega</router-link> |
      <router-link to="/productoservicio">Producto/Servicio</router-link> |
      <router-link to="/cliente">Cliente</router-link> |
      <router-link to="/factura">Factura</router-link> |
      <router-link to="/reportefactura">Reporte Facturas</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navbar-container {
  background-color: #007bff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: whitesmoke;
}
</style>