<!--
 * @Description: 入库详情
 * @Autor: codeBo
 * @Date: 2023-06-01 16:51:40
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-02 17:49:43
-->
<template>
  <div style="padding-bottom: 10px; font-weight: bold">基本信息</div>
  <el-card shadow="never">
    <el-form ref="flashPromotionForm" label-width="100px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="货主">
            {{ inOrder.shipperName }}
          </el-form-item>
          <el-form-item label="司机">
            {{ inOrder.driver }}
          </el-form-item>
          <el-form-item label="指定仓库">
            {{ inOrder.warehouseName }}
          </el-form-item>
          <el-form-item label="创建时间">
            {{ inOrder.createTime }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="货主订单号">
            {{ inOrder.shipperOrderNo }}
          </el-form-item>
          <el-form-item label="司机电话">
            {{ inOrder.driverPhone }}
          </el-form-item>
          <el-form-item label="预期到货数量">
            {{ inOrder.expectCount }}
          </el-form-item>
          <el-form-item label="创建人">
            {{ inOrder.createName }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入库单号">
            {{ inOrder.inOrderNo }}
          </el-form-item>
          <el-form-item label="预计到达日">
            {{ inOrder.estimatedArrivalTime }}
          </el-form-item>
          <el-form-item label="状态">
            {{ inOrder.statusName }}
          </el-form-item>
          <el-form-item label="最近时间">
            {{ inOrder.updateTime }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <div style="font-weight: bold">货品列表</div>
  <el-table
    :data="(inOrder.inOrderItemList as any)"
    stripe
    border
    style="width: 100%; margin-top: 10px"
  >
    <el-table-column prop="goodsInfo.name" label="名称" width="200px" />
    <el-table-column prop="goodsInfo.code" label="商品编码" />
    <el-table-column prop="goodsInfo.barcode" label="商品条码" />
    <el-table-column prop="goodsInfo.temperatureTypeName" label="温度类型" />
    <el-table-column prop="expectCount" label="预期数量" />
    <el-table-column prop="unitName" label="单位" />
    <el-table-column prop="baseCount" label="拆零数量">
      <template v-slot="scope">
        {{ scope.row.baseCount }}{{ scope.row.baseUnitName }}
      </template>
    </el-table-column>
    <el-table-column prop="price" label="拆零单价(元)" />
    <el-table-column label="总价(元)">
      <template v-slot="scope">
        {{ scope.row.price * scope.row.expectCount * scope.row.baseCount }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { getDetailList } from '@/api'
import { onMounted, ref } from 'vue'
import type {
  inApproveTaskList,
  InOrder,
  InOrderPutawayRecord,
  InOrderReceivingRecord,
} from '@/api/inbound/type'
import { useRoute } from 'vue-router'
const approveTaskList = ref<inApproveTaskList[]>([]) // inApproveTaskList 数据
const inOrder = ref<InOrder>({} as InOrder) // inOrder 数据
const inPutawayTaskList = ref<InOrderPutawayRecord[]>([]) // inPutawayTaskList
const inReceivingTaskList = ref<InOrderReceivingRecord[]>([]) // inReceivingTaskList
onMounted(async () => {
  const { id } = useRoute().params
  console.log('useRoute', id)
  const res = await getDetailList(id as string)
  approveTaskList.value = res.data.inApproveTaskList
  inOrder.value = res.data.inOrder
  inPutawayTaskList.value = res.data.inPutawayTaskList
  inReceivingTaskList.value = res.data.inReceivingTaskList
})
</script>
