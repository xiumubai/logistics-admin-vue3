<template>
  <div>
    <el-card>
      <template #header>
        <h3>基本信息</h3>
      </template>
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="盘点原因">
              {{ invCounting?.reasonName }}
            </el-form-item>
            <el-form-item label="创建人">
              {{ invCounting?.createName }}
            </el-form-item>
            <el-form-item label="备注">
              {{ invCounting?.remarks }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划盘点时间">
              {{ invCounting?.planCountingTime }}
            </el-form-item>
            <el-form-item label="创建时间">
              {{ invCounting?.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库位">
              {{ invCounting?.warehouseName }} {{ invCounting?.storehouseName }}
            </el-form-item>
            <el-form-item label="状态">
              {{ invCounting?.statusName }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3 style="font-weight: bold">货品列表</h3>
      <el-table
        :data="inventoryInfoList"
        stripe
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column label="序号" width="70" align="center">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="goodsInfo.name" label="货品名称" width="220" />
        <el-table-column prop="goodsInfo.code" label="商品编码" width="110" />
        <el-table-column
          prop="goodsInfo.barcode"
          label="商品条码"
          width="110"
        />
        <el-table-column
          prop="goodsInfo.goodsTypeName"
          label="商品类型"
          width="110px"
        />
        <el-table-column prop="totalCount" label="总库存" />
        <el-table-column prop="actualCount" label="实际库存" />
        <el-table-column prop="pickingCount" label="已拣未发货数量" />
        <el-table-column prop="differenceCount" label="差异库存" />
      </el-table>
      <h3
        v-if="invCountingTaskList != null && invCountingTaskList.length > 0"
        style="margin: 20px 0"
      >
        盘点记录
      </h3>
      <el-table
        v-if="invCountingTaskList != null && invCountingTaskList.length > 0"
        :data="invCountingTaskList"
        stripe
        border
      >
        <el-table-column prop="countingUser" label="盘点人" />
        <el-table-column prop="countingCompleteTime" label="盘点完成时间" />
        <el-table-column prop="statusName" label="状态" />
        <el-table-column prop="remarks" label="备注" />
      </el-table>

      <div style="margin: 20px; text-align: center">
        <el-button @click="back">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getInvCountingDetail } from '@/api'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const invCounting = ref()
const inventoryInfoList = ref()
const invCountingTaskList = ref()
const back = () => {
  router.back()
}
onMounted(async () => {
  const res: any = await getInvCountingDetail(route.params.id as string)
  invCounting.value = res.data.invCounting
  inventoryInfoList.value = res.data.inventoryInfoList
  invCountingTaskList.value = res.data.invCountingTaskList
})
</script>

<style scoped></style>
