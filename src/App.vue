<template>
  <div id="app">
    <header class="header py-2 mb-3">
      <div class="container">
        <router-link to="/"><img src="./assets/logo.png" alt="logo" class="logo"></router-link>
      </div>
    </header>  

    <router-view/>

    <footer class="footer text-right py-2 mt-3">
      <div class="container">The<span>Vue</span>App.</div>
    </footer>
  </div>
</template>

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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logo {
  height: 35px;
}
.header {
  background: #0324152d;
}
.footer {
  background: #0324152d;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  span {
    color: #42b983;
  }
}
</style>
