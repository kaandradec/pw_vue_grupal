import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductoServicioView from '@/views/ProductoServicioView.vue'
import BodegaView from '@/views/BodegasView.vue'
import ClienteView from '@/views/ClienteView.vue'
import ReporteFacturasView from '@/views/ReporteFacturasView.vue'
import FacturaView from '@/views/FacturaView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/bodega',
    name: 'bodega',
    component: BodegaView
  },
  {
    path: '/productoservicio',
    name: 'productoservicio',
    component: ProductoServicioView
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView
  },
  {
    path: '/factura',
    name: 'factura',
    component: FacturaView
  },
  {
    path: '/reportefactura',
    name: 'reportefactura',
    component: ReporteFacturasView
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
