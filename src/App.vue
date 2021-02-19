<template>
  <div id="app">
    <div class="logo-container">
      <img alt="Booj logo" src="./assets/booj_red_white.svg">
    </div>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
  </div>
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .logo-container {
    background-color: black;
  }
}
</style>
