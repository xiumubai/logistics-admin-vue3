<!--
 * @Description: 入库详情
 * @Autor: codeBo
 * @Date: 2023-06-01 16:51:40
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-06 16:44:54
-->
<template>
  <div v-loading="loading">
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
    <div style="font-weight: bold; margin-top: 20px">货品列表</div>
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
    <div
      v-if="approveTaskList != null && approveTaskList.length > 0"
      style="margin-top: 20px; font-weight: bold"
    >
      审批记录
    </div>
    <el-table
      v-if="approveTaskList != null && approveTaskList.length > 0"
      :data="approveTaskList"
      stripe
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="approveUser" label="审批人" />
      <el-table-column prop="approveTime" label="审批时间" />
      <el-table-column prop="statusName" label="审批状态" />
      <el-table-column prop="remarks" label="审批记录" />
    </el-table>
    <div
      v-if="inReceivingTaskList != null && inReceivingTaskList.length > 0"
      style="margin-top: 20px; font-weight: bold"
    >
      收货记录
    </div>
    <el-table
      v-if="inReceivingTaskList != null && inReceivingTaskList.length > 0"
      :data="inReceivingTaskList"
      stripe
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="receivingUser" label="收货人" />
      <el-table-column prop="receivingTime" label="收货时间" />
      <el-table-column prop="expectCount" label="预期到货数量" />
      <el-table-column prop="actualCount" label="实际到货数量" />
      <el-table-column prop="statusName" label="收货状态" />
      <el-table-column prop="remarks" label="收货备注" />
    </el-table>
    <div
      v-if="inPutawayTaskList != null && inPutawayTaskList.length > 0"
      style="margin-top: 20px; font-weight: bold"
    >
      上架记录
    </div>
    <el-table
      v-if="inPutawayTaskList != null && inPutawayTaskList.length > 0"
      :data="inPutawayTaskList"
      stripe
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="putawayUser" label="上架人" />
      <el-table-column prop="putawayTime" label="上架时间" width="160" />
      <el-table-column prop="expectCount" label="预期到货数量" />
      <el-table-column prop="actualCount" label="实际到货数量" />
      <el-table-column prop="unqualifiedCount" label="不合格数量" />
      <el-table-column prop="putawayCount" label="上架数量" />
      <el-table-column prop="statusName" label="上架状态" />
      <el-table-column prop="remarks" label="上架备注" />
    </el-table>
    <div
      v-if="inPutawayTaskList != null && inPutawayTaskList.length > 0"
      style="margin-top: 20px; font-weight: bold"
    >
      上架明细
    </div>
    <el-table
      v-if="inPutawayTaskList != null && inPutawayTaskList.length > 0"
      :data="(inOrder.inOrderItemList as any)"
      stripe
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="goodsInfo.name" label="名称" width="200px" />
      <el-table-column prop="goodsInfo.code" label="商品编码" />
      <el-table-column prop="expectCount" label="预期数量" />
      <el-table-column prop="unitName" label="单位" />
      <el-table-column prop="baseCount" label="拆零数量">
        <template v-slot="scope">
          {{ scope.row.baseCount }}{{ scope.row.baseUnitName }}
        </template>
      </el-table-column>
      <el-table-column prop="actualCount" label="实际数量" />
      <el-table-column prop="unqualifiedCount" label="不合格数量" />
      <el-table-column prop="putawayCount" label="上架数量" />
      <el-table-column label="指定库位" width="280px;">
        <template v-slot="scope">
          <el-cascader
            :disabled="true"
            v-model="scope.row.wareIds"
            :options="wareList"
            style="width: 100%"
          ></el-cascader>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin: 10px 0" @click="backHandle">返回</el-button>
  </div>
</template>
<script setup lang="ts">
import { getDetailList, findNodesList } from '@/api'
import { onMounted, ref } from 'vue'
import type {
  InApproveTaskList,
  InOrder,
  InOrderPutawayRecord,
  InOrderReceivingRecord,
  InOrderInfo,
} from '@/api/inbound/type'
import { useRoute } from 'vue-router'
const approveTaskList = ref<InApproveTaskList[]>([]) // inApproveTaskList 数据
const inOrder = ref<InOrder>({} as InOrder) // inOrder 数据
const inPutawayTaskList = ref<InOrderPutawayRecord[]>([]) // inPutawayTaskList
const inReceivingTaskList = ref<InOrderReceivingRecord[]>([]) // inReceivingTaskList
const wareList = ref<InOrderInfo.WarehouseNode[]>([]) // 上架记录数据 （指定库位树形）
const loading = ref(false)
const backHandle = () => {
  window.history.back()
}
onMounted(async () => {
  loading.value = true
  const { id } = useRoute().params
  console.log('useRoute', id)
  const res = await getDetailList(id as string)
  const list = await findNodesList()
  wareList.value = list.data
  approveTaskList.value = res.data.inApproveTaskList
  inOrder.value = res.data.inOrder
  inPutawayTaskList.value = res.data.inPutawayTaskList
  inReceivingTaskList.value = res.data.inReceivingTaskList
  loading.value = false
})
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
