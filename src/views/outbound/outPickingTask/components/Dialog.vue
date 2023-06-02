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
              <el-form-item label="拣货任务单号">
                {{ outPickingTask?.taskNo }}
              </el-form-item>
              <el-form-item label="创建时间">
                {{ outPickingTask?.createTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库">
                {{ outPickingTask?.warehouseName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                {{ outPickingTask?.statusName }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
      <h3>货品列表</h3>
      <el-table :data="outPickingTask?.outPickingItemList" border>
        <el-table-column prop="goodsName" label="货物名称" width="300" />
        <el-table-column prop="barcode" label="货物条码" width="110" />
        <el-table-column prop="pickingCount" label="拣货个数" />
        <el-table-column prop="weight" label="重量" />
        <el-table-column prop="volume" label="体积" />
        <el-table-column prop="warehouseName" label="仓库" width="130" />
        <el-table-column prop="storehouseName" label="库位" width="150" />
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
// 定义props类型
interface DialogProps {
  id: string
  api?: (params: any) => Promise<any>
}

const dialogVisible = ref(false)

const dialogProps = ref<DialogProps>({ id: '' })
const outPickingTask = ref()
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  fetchData()
}

const fetchData = async () => {
  const res = await dialogProps.value.api(dialogProps.value.id)
  outPickingTask.value = res.data
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
