<template>
  <div class="hello">
    
    <h2>Bienvenido al Centro Médico EcoSalud</h2>
    <p>
      En el Centro Médico Vida Sana nos dedicamos a cuidar tu salud y la de tu familia.<br>
      Nuestro equipo profesional y nuestras modernas instalaciones están a tu servicio para ofrecerte la mejor atención médica.<br>
      ¡Gracias por confiar en nosotros!
    </p>
   </div>
</template>

<script>
export default {
  name: 'HelloWorld',
 
}
</script>
<style scoped>
.hello {
  background: linear-gradient(135deg, #ecf6f6 0%, #d0f0f5 100%);
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logo {
  width: 120px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 24px auto 16px auto;
  display: block;
  background: linear-gradient(135deg, #e0f7fa 0%, #f7f7f2 100%);
}
.logo:hover {
  transform: scale(1.04) rotate(-2deg);
  box-shadow: 0 8px 24px rgba(66, 185, 131, 0.18);
}
</style>
