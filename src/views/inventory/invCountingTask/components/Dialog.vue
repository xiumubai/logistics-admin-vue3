<template>
  <el-dialog
    v-model="dialogVisible"
    title="更新数据"
    :destroy-on-close="true"
    width="70%"
  >
    <el-card shadow="never">
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
              {{ invCounting.createName }}
            </el-form-item>
            <el-form-item label="备注">
              {{ invCounting.remarks }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划盘点时间">
              {{ invCounting.planCountingTime }}
            </el-form-item>
            <el-form-item label="创建时间">
              {{ invCounting.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库位">
              {{ invCounting.warehouseName }} {{ invCounting.storehouseName }}
            </el-form-item>
            <el-form-item label="状态">
              {{ invCounting.statusName }}
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
        <el-table-column prop="goodsInfo.name" label="货品名称" width="120" />
        <el-table-column prop="goodsInfo.code" label="商品编码" width="120" />
        <el-table-column
          prop="goodsInfo.barcode"
          label="商品条码"
          width="120"
        />
        <el-table-column
          prop="goodsInfo.goodsTypeName"
          label="商品类型"
          width="120px"
        />
        <el-table-column prop="totalCount" label="总库存" />
        <el-table-column label="实际盘点库存" width="120">
          <template v-slot="scope">
            <el-input v-model="scope.row.actualCount" />
          </template>
        </el-table-column>
        <el-table-column
          prop="pickingCount"
          label="已拣未发货数量"
          width="130"
        />
        <el-table-column label="差异量">
          <template v-slot="scope">
            {{ Number(scope.row.totalCount) - Number(scope.row.actualCount) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref } from 'vue'
import { getInvCountingDetail, updateInvCountingTask } from '@/api'
import { ElMessage } from 'element-plus'
// 定义props类型
interface DialogProps {
  id: string
  getTableList?: () => Promise<any>
}

const invCounting = ref<any>({})
const inventoryInfoList = ref([])

const dialogVisible = ref(false)
// props定义:title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({
  id: '',
})

// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  getDetail(params.id)
}

const getDetail = async (id: string) => {
  const res = await getInvCountingDetail(id)
  invCounting.value = res.data.invCounting
  inventoryInfoList.value = res.data.inventoryInfoList
}

const handleSubmit = () => {
  let count = 0
  inventoryInfoList.value.forEach(function (row: any) {
    let r = /^\+?[1-9][0-9]*$/
    if (r.test(row.actualCount)) {
      invCounting.value.invCountingItemList.forEach(function (item: any) {
        if (row.goodsId == item.goodsId) {
          item.totalCount = row.totalCount
          item.actualCount = row.actualCount
          item.differenceCount = row.totalCount - row.actualCount
        }
      })
    } else {
      count++
    }
  })
  if (count > 0) {
    ElMessage.error('请补充数据')
    return
  }
  updateInvCountingTask(invCounting.value.invCountingItemList).then(() => {
    ElMessage.success('更新成功')
    dialogVisible.value = true
    dialogProps.value.getTableList!()
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
