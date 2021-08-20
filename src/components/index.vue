<template>
  <div class="index">
    <el-header>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <i ><img :src="item.img" alt=""></i>
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <div id="user">
        <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../static/icons/用户(2).png" alt="" />
        </span>
          <el-dropdown-menu slot="dropdown">

                 <el-dropdown-item @click.native="logout" >退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        navList: [
          { name: "/dashboard", navItem: "首页",img:"../../static/icons/首页.png"},
          { name: "/point", navItem: "接种点" ,img:"../../static/icons/地址.png"},
          { name: "/vaccine", navItem: "疫苗" ,img:"../../static/icons/7疫苗.png"},
        ],
      };
    },
    mounted() {
      this.$route.path == '/index' ? this.$router.push('/dashboard') : null
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        console.log(2)
        //清除localStorge的数据
        this.$store.commit('logout');
        this.$router.push('/login')
      }
    },
  };
</script>

<style lang="scss" scoped>
  .el-header{
    padding: 0px;
  }
  .index {
    width: 100%;
    height: 100%;
  }
  #user {
    position: absolute;
    top: 7px;
    right: 100px;
  }
  #user img {
    width: 30px;
    height: 30px;
  }
  .el-dropdown {
    cursor: pointer;
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
    top: 10px;
    left:70px
  }
</style>
