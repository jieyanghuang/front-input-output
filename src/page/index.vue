<template>
  <div class="master">
    <el-container class="container">
      <el-header>科学计算平台</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="to"
            background-color="#d3dce6"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>模拟问题</span>
              </template>
              <el-menu-item index="/heatmap" class="el-menu-item_left"
                >拉普拉斯方程</el-menu-item
              >
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>统计计算</span>
              </template>
              <el-menu-item index="1" class="el-menu-item_left"
                >回归分析</el-menu-item
              >
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>优化计算</span>
              </template>
              <el-menu-item index="2" class="el-menu-item_left"
                >线性规划</el-menu-item
              >
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数值计算</span>
              </template>
              <el-menu-item index="3" class="el-menu-item_left"
                >求解方程</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("load", () => {
      // 导航页在刷新后应当展开
    });
  },
  methods: {
    handleOpen(index) {
      console.log(index);
    },
    handleClose(index) {
      console.log(index);
    },
    to(index) {
      index === "/heatmap" && this.$router.push(index);
      index !== "/heatmap" && this.$router.push("/empty");
    },
  },
};
</script>

<style lang="scss">
.master {
  height: 100%;
}
html,
body {
  margin: 0;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.container {
  height: 100%;
}
.el-menu-item_left {
  padding-left: 48px !important;
}
</style>