<template>
  <el-card>
    <div style="align-items: center; padding: 10px 0">
      <h3 style="float: left">入库/出库统计</h3>
      <div style="float: right">
        <el-button-group>
          <el-button
            :type="type === 'week' ? 'primary' : ''"
            plain
            @click="selectTab('week')"
          >
            本周
          </el-button>
          <el-button
            :type="type === 'month' ? 'primary' : ''"
            plain
            @click="selectTab('month')"
          >
            本月
          </el-button>
          <el-button
            :type="type === 'year' ? 'primary' : ''"
            plain
            @click="selectTab('year')"
          >
            全年
          </el-button>
        </el-button-group>
      </div>
      <div style="clear: both"></div>
    </div>
    <div
      id="chart"
      ref="chart"
      class="chart"
      style="height: 500px; width: 100%"
    ></div>
  </el-card>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getStatics } from '@/api'
const type = ref('week')
const xDate = ref()
const yDate1 = ref()
const yDate2 = ref()
onMounted(async () => {
  fetchData(type.value)
})

/**
 * @description: change tab
 * @param {*} t
 * @returns {*}
 */
const selectTab = (t: string) => {
  type.value = t
  fetchData(type.value)
}

const fetchData = async (type: string) => {
  const res = await getStatics(type)
  xDate.value = res.data.xDate
  yDate1.value = res.data.yDate1
  yDate2.value = res.data.yDate2
  setChartData('chart')
}

const setChartData = (id: string) => {
  let myChart = echarts.init(document.getElementById(id) as HTMLElement)
  // 指定图表的配置项和数据
  let option = {
    xAxis: {
      type: 'category',
      data: xDate.value,
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: ['入库', '出库'],
    },
    series: [
      {
        name: '入库',
        data: yDate1.value,
        type: 'bar',
      },
      {
        name: '出库',
        data: yDate2.value,
        type: 'bar',
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped></style>
