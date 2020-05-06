<template>
  <div>
    <router-view/>
    <hr/>
    <div>
      <router-link to="/labels">Tags</router-link>
      |
      <router-link to="/money">Expense</router-link>
      |
      <router-link to="/statistics">Statistics</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
