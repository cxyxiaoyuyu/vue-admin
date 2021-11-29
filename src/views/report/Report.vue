<template>
  <div class="report">
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 650px; height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 引入 echarts 按需引入
import * as echarts from "echarts";
import _ from "lodash";
import { getReport } from '@/api/data.js'
export default {
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  // 此时,页面上的元素,已经被渲染完毕了
  mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    getReport().then((res) => {
      if (res) {
        const result = _.merge(res.data, this.options);
        console.log(result)
        myChart.setOption(result);
      }
    });
  },
};
</script>

<style scoped></style>