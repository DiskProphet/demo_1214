<template>
  <div class="header">
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand href="#"><img src="../header/logo.png" class="logo"><span class="fisrt">DISK</span><span class="second">PROPHET</span></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item href="#" :class="button_index===1?'button_active':''" v-on:click="button_click(1)">
            <router-link to="/UserInfo" class="nav-item">
              <div class="button_1 button_text">仪表盘</div>
            </router-link>
          </b-nav-item>
          <b-nav-item href="#" :class="button_index===2?'button_active':''" v-on:click="button_click(2)">
            <router-link to="/progressinfo" class="nav-item">
              <div class="button_2 button_text">健康状况</div>
            </router-link>
          </b-nav-item>
          <b-nav-item href="#" :class="button_index===3?'button_active':''" v-on:click="button_click(3)">
            <router-link to="/" class="nav-item">
              <div class="button_3 button_text disable">历史数据</div>
            </router-link>
          </b-nav-item>
        </b-nav>
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item href="#">
            <icon name="search"></icon>
          </b-nav-item>
          <b-nav-item href="#">
            <icon name="bell"></icon>
          </b-nav-item>
          <b-nav-item href="#">
            <icon name="cog"></icon>
          </b-nav-item>
          <b-nav-item href="#">
            <icon name="repeat"></icon>
          </b-nav-item>
          <b-nav-item-dropdown class="user">
            <template slot="button-content" left>                             
                       <icon name="user-circle"></icon> &nbsp;<em class="font_size_12">Admin</em>
</template>
            <b-dropdown-item href="#">注销</b-dropdown-item>
            <b-dropdown-item href="#">退出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        button_index: 1
      };
    },
    methods: {
      button_click(index) {
        this.button_index = index;
      }
    }
  };
</script>

<style scoped>
  .nav-item {
    color: #fff;
  }
  .header {
    background-color: #000;
    height: 60px;
  }
  .header #nav_collapse {
    margin-bottom: 15px;
  }
  .logo {
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    margin-left: 5.5rem;
    padding-right: 1rem;
    vertical-align: -webkit-baseline-middle;
  }
  .fisrt {
    color: #fff;
    font-weight: 100;
    margin-left: 1rem;
    font-size: 15px;
  }
  .second {
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  }
  .button_1 {
    background: #000;
    border-color: #000;
    min-width: 70px;
  }
  .button_text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
  }
  .button_text:hover {
    color: rgba(255, 255, 255, 1);
  }
  .button_2 {
    background: #000;
    border-color: #000;
    min-width: 70px;
  }
  .button_3 {
    background: #000;
    border-color: #000;
    min-width: 70px;
  }
  .nav-item:hover {
    text-decoration: none;
  }
  .header .nav-item div {
    line-height: 26px;
  }
  .header .nav-link .nav-item div:hover,
  .button_active .nav-link .nav-item div {
    background-color: rgba(255, 255, 255, 0.15);
    width: 70px;
    height: 26px;
    border-radius: 13px;
    box-shadow: 0px 0px 0px 0px transparent;
    color: #fff;
  }
  .button_active .nav-link .nav-item,
  .button_active .nav-link .nav-item:hover {
    font-weight: bold;
  }
  .ml-auto {
    margin-right: 70px;
  }
  .ml-auto .nav-item {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
  .ml-auto .nav-item .nav-link {
    width: 100%;
    height: 100%;
    margin-left: -2px;
    margin-top: -4px;
  }
  .ml-auto .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  .ml-auto .nav-item:hover .nav-link svg {
    color: rgba(255, 255, 255, 1);
  }
  .ml-auto .b-nav-dropdown .dropdown-menu {
    left: -45px !important;
  }
  .user svg,
  .user em {
    top: -3px !important;
    position: relative !important;
  }
  .ml-auto .b-nav-dropdown {
    width: 100%;
    margin-left: 10px;
  }
  .ml-auto .b-nav-dropdown:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.15);
    height: 26px;
    border-radius: 13px;
  }
  .user_name {
    display: inline-block;
    height: 26px;
  }
  .disable:hover {
    color: rgba(255, 255, 255, 0.5) !important;
    background: #000 !important;
    cursor: not-allowed;
  }
</style>
