<template>
  <div id="app">
    <header class="header py-2 mb-3">
      <div class="container text-left">        
        <router-link to="/"><img src="./assets/lorem-logo.png" alt="logo" class="logo"></router-link>
        <authorize-buttons class="float-right mt-2"></authorize-buttons>
      </div>      
    </header>  

    <router-view/>

    <footer class="footer text-right py-2 mt-3">
      <div class="container">
        <router-link to="/" class="footer-link">Lorem<span>Ipsum</span>Shop.</router-link>  
      </div>
    </footer>
  </div>
</template>

<script>
import AuthorizeButtons from "@/components/AuthorizeButtons.vue";
export default {
  components: { AuthorizeButtons }
};
</script>


<style lang="scss">
html {
  min-height: 100%;
  position: relative;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
}
.logo {
  height: 52px;
}
.header {
  background: #b9d492;
}
.footer {
  font-weight: bold;
  background: #b9d492;

  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  span {
    color: #7aa43f;
  }
}
.footer-link {
  color: #2c3e50;
}
.btn.btn-secondary.my-buttons {
  background: #295038;
  &:hover {
    background: #7aa43f;
  }
  &.router-link-exact-active {
    background: #7aa43f;
  }
}
</style>
