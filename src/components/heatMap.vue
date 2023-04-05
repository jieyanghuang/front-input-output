<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>模拟问题</el-breadcrumb-item>
      <el-breadcrumb-item>拉普拉斯方程</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <div class="input">
        <el-form
          class="form"
          label-position="top"
          label-width="80px"
          ref="form"
          :model="formLabelAlign"
          :rules="rules"
        >
          <el-form-item label="上边界条件" prop="top">
            <el-input v-model.number="formLabelAlign.top"></el-input>
          </el-form-item>
          <el-form-item label="下边界条件" prop="bottom">
            <el-input v-model.number="formLabelAlign.bottom"></el-input>
          </el-form-item>
          <el-form-item label="左边界条件" prop="left">
            <el-input v-model.number="formLabelAlign.left"></el-input>
          </el-form-item>
          <el-form-item label="右边界条件" prop="right">
            <el-input v-model.number="formLabelAlign.right"></el-input>
          </el-form-item>
          <el-form-item label="迭代次数" prop="maxiter">
            <el-input v-model.number="formLabelAlign.maxiter"></el-input>
          </el-form-item>
          <el-form-item label="迭代方法" prop="method">
            <el-select
              v-model="formLabelAlign.method"
              placeholder="请选择"
              class="form_select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        id="myChart"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0)"
      ></div>
    </div>
  </div>
</template>
<script>
import rules from "../assets/valid/heatmapValid";
export default {
  mounted() {
    this.init();
  },
  data() {
    return {
      formLabelAlign: {
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        maxiter: 100,
        method: "SOR",
      },
      loading: false,
      data: [],
      max: 100,
      rules: rules,
      responseTimeMs: 0,
      options: [
        {
          value: "SOR",
          label: "逐次超松弛迭代法(SOR)",
        },
        {
          value: "Jacobi",
          label: "雅克比迭代法(Jacobi)",
        },
      ],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      const startTime = window.performance.now(); // 记录请求开始时间
      this.$axios
        .post("http://127.0.0.1:5000/heatmap", this.formLabelAlign)
        .then((re) => {
          const endTime = window.performance.now(); // 记录请求结束时间
          const responseTime = endTime - startTime; // 计算响应时间
          this.responseTimeMs = responseTime.toFixed(2);
          this.data = re.data.data;
          console.log(this.data);
          this.loading = false;
          /* eslint-disable-next-line*/
          const { maxiter, method, ...formLabelCopy } = this.formLabelAlign;
          this.max = Math.max(...Object.values(formLabelCopy));
          this.init();
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
        });
    },
    init() {
      // 假设 data 为一个 N*N 的数组
      let xData = [];
      let yData = [];
      for (let j = 0; j < 100; j++) {
        yData.push(j / 100);
        xData.push(j / 100);
      }
      console.log(this.data);
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      /** @type EChartsOption */
      var option = {
        tooltip: {
          formatter: function (p) {
            console.log(p);
            return `x:${p.data[0] / 100} y:${p.data[1] / 100} val:${p.data[2]}`;
          },
        },
        xAxis: {
          type: "category",
          data: xData,
        },
        yAxis: {
          type: "category",
          data: yData,
        },
        visualMap: {
          min: 0,
          max: this.max,
          calculable: true,
          orient: "horizontal",
          left: "center",
          realtime: false,
          bottom: "0%",
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        series: [
          {
            type: "heatmap",
            animation: false,
            data: this.data,
            progressive: 1000,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    submitForm() {
      console.log(this.rules);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.getData();
        } else {
          this.$message("请检查你的输入");
        }
      });
    },
    resetForm() {
      this.formLabelAlign = {
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        maxiter: 100,
        method: "SOR",
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main .content {
  height: 100%;
  display: flex;
}
.input {
  width: 500px;
  margin: 40px 0 0 0;
}
#myChart {
  width: 800px;
  flex: 1;
}
.form {
  text-align: left;
  line-height: 0px;
  margin: 10px 10px;
  &_select {
    width: 480px;
  }
}
</style>
