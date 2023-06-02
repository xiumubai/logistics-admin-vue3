<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    title="查看"
    width="60%"
  >
    <el-card shadow="never">
      <h3>基本信息</h3>
      <el-form>
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
      </el-form>
      <h3>货品列表</h3>
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
    </el-card>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref } from 'vue'
import { getOutOrderDetail } from '@/api'

// 定义props类型
interface DialogProps {
  id: string
}

const dialogVisible = ref(false)

const dialogProps = ref<DialogProps>({ id: '' })
const outOrder = ref()
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  fetchData()
}

const fetchData = async () => {
  const res = await getOutOrderDetail(dialogProps.value.id)
  outOrder.value = res.data.outOrder
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
