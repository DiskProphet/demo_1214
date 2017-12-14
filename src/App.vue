<template>
  <div id="app">
    <my-header v-show="!ifLogIn"></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer  v-show="!ifLogIn"></my-footer>
  </div>
</template>

<script>
  import header from "./components/header/header.vue";
  import footer from "./components/footer/footer.vue"
  export default {
    data() {
      return {};
    },
    components: {
      "my-header": header,
      "my-footer": footer
    },
    created() {
    },
    computed: {
      ifLogIn() {
        return this.$route.path === "/Login"
      }
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
