<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="[defaultSelectedKeys]"
        >
          <a-menu-item v-for="item in menuList" :key="item.componentName">
            <router-link :to="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <div class="header-title">{{$route.name}}</div>
          <!-- <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          /> -->
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: 'calc(100vh - 112px)',
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {

    return {
      collapsed: false,
      menuList: this.$router.options.routes,
      defaultSelectedKeys: this.$route.matched && this.$route.matched.length ? this.$route.matched[0].components.default.name : '首页',
    };
  },
  created() {
    console.log(this.$router.options.routes);
    console.log(this.$route);
  },
  method: {
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .header-title {
    font-weight: bold;
    height: 100%;
    font-size: 20px;
    text-align: left;
    padding-left: 24px;
  }
}
</style>
