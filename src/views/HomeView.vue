<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logop.png" />
    <HelloWorld msg="Trabajo Grupal Web" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #f9fafa 0%, #d0f0f5 100%);
  animation: fadeIn 1.5s;
}

img {
  width: 520px;
  margin-bottom: 24px;
  animation: logoBounce 1.2s;
  border-radius: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-30px);}
  to { opacity: 1; transform: translateY(0);}
}

@keyframes logoBounce {
  0% { transform: scale(0.8);}
  60% { transform: scale(1.1);}
  100% { transform: scale(1);}
}
</style>
