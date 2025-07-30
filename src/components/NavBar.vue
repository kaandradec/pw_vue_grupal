<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logop.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-center">
      <!-- Opcional: enlaces de navegación -->
       <router-link to="/">Home</router-link> |
      <router-link to="/bodega">Bodega</router-link> |
      <router-link to="/productoservicio">Producto/Servicio</router-link> |
      <router-link to="/cliente">Cliente</router-link> |
      <router-link to="/factura">Factura</router-link> |
      <router-link to="/reportefactura">Reporte Facturas</router-link>
    </div>
  
  </nav>
</template>

<script>
export default {
   name:'Navbar'
};
</script>

<style>

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: #007bff;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 45px;
  object-fit: contain;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f8fafb;
}

nav a.router-link-exact-active {
  color: rgb(36, 8, 150);
}
</style>