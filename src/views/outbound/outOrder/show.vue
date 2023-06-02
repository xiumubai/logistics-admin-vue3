<template>
  <div>
    <el-card>
      <template #header>
        <h3>基本信息</h3>
      </template>
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库单号">
              {{ outOrder?.outOrderNo }}
            </el-form-item>
            <el-form-item label="收货人">
              {{ outOrder?.consignee }}
            </el-form-item>
            <el-form-item label="订单备注">
              {{ outOrder?.orderComment }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单号">
              {{ outOrder?.orderNo }}
            </el-form-item>
            <el-form-item label="收货人电话">
              {{ outOrder?.consigneeTel }}
            </el-form-item>
            <el-form-item label="指定仓库">
              {{ outOrder?.warehouseName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              {{ outOrder?.createTime }}
            </el-form-item>
            <el-form-item label="收货人地址">
              {{ outOrder?.deliveryAddress }}
            </el-form-item>
            <el-form-item label="状态">
              {{ outOrder?.statusName }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3 style="font-weight: bold">货品列表</h3>
      <el-table
        :data="outOrder?.outOrderItemList"
        stripe
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column prop="goodsName" label="货品名称" width="200" />
        <el-table-column prop="barcode" label="货品条码" width="130" />
        <el-table-column prop="buyCount" label="购买个数" />
        <el-table-column prop="weight" label="重量" />
        <el-table-column prop="volume" label="体积" />
        <el-table-column prop="warehouseName" label="仓库" width="130" />
        <el-table-column prop="storehouseName" label="库位" width="180" />
        <el-table-column prop="statusName" label="状态" />
      </el-table>
      <h3
        v-if="outPickingTaskList != null && outPickingTaskList.length > 0"
        style="margin: 20px 0"
      >
        拣货记录
      </h3>
      <el-table
        v-if="outPickingTaskList != null && outPickingTaskList.length > 0"
        :data="outPickingTaskList"
        stripe
        border
      >
        <el-table-column prop="taskNo" label="任务编号" width="180" />
        <el-table-column prop="warehouseName" label="仓库" width="140" />
        <el-table-column prop="storeshelfName" label="货架号" />
        <el-table-column prop="pickingUser" label="拣货人" width="120" />
        <el-table-column prop="pickingTime" label="拣货时间" width="160" />
        <el-table-column prop="pickingCount" label="拣货数量" />
        <el-table-column prop="statusName" label="状态" />
      </el-table>

      <h3
        v-if="outDeliverTaskList != null && outDeliverTaskList.length > 0"
        style="margin: 20px 0"
      >
        发货记录
      </h3>
      <el-table
        v-if="outDeliverTaskList != null && outDeliverTaskList.length > 0"
        :data="outDeliverTaskList"
        stripe
        border
      >
        <el-table-column prop="taskNo" label="任务编号" width="160" />
        <el-table-column prop="deliverUser" label="发货人" width="130" />
        <el-table-column prop="deliverTime" label="发货时间" width="160" />
        <el-table-column prop="deliverCount" label="发货数量" width="140" />
        <el-table-column prop="trackingNo" label="物流单号" width="140" />
        <el-table-column prop="trackingCompany" label="物流公司" />
        <el-table-column prop="statusName" label="状态" />
      </el-table>
      <div style="margin: 20px; text-align: center">
        <el-button @click="back">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { OutOrder } from '@/api/outbound/types'
import { ref, onMounted } from 'vue'
import { getOutOrderDetail } from '@/api'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const outOrder = ref<OutOrder.OutOrderDetail>()
const outPickingTaskList = ref<OutOrder.OutPickingTaskListItem[]>()
const outDeliverTaskList = ref<OutOrder.OutDeliverTaskListItem[]>()
const back = () => {
  router.back()
}
onMounted(async () => {
  const res = await getOutOrderDetail(route.params.id as string)
  outOrder.value = res.data.outOrder
  outPickingTaskList.value = res.data.outPickingTaskList
  outDeliverTaskList.value = res.data.outDeliverTaskList
})
</script>

<style scoped></style>
