<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :destroy-on-close="true"
      :title="dialogProps.title"
      width="60%"
    >
      <el-table
        v-if="dialogProps.title === '库存详情'"
        :data="dialogProps.rowData?.inventoryInfoList"
        border
      >
        <el-table-column label="序号" width="70" align="center">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="warehouseName" label="仓库" width="120" />
        <el-table-column prop="storehouseName" label="库位" width="120" />
        <el-table-column prop="totalCount" label="总库存" width="90" />
        <el-table-column prop="lockCount" label="锁定库存" width="90" />
        <el-table-column prop="availableCount" label="可用库存" width="90" />
        <el-table-column
          prop="pickingCount"
          label="已拣未发货数量"
          width="140"
        />
        <el-table-column prop="warningCount" label="预警数量" width="90" />
        <el-table-column prop="saleCount" label="历史销量" width="90" />
        <el-table-column label="操作" width="130" align="center" fixed="right">
          <template v-slot="scope">
            <el-button type="text" @click="updateInventoryShow(scope.row)">
              手动上架库存
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <ProTable
        v-else
        ref="proTable"
        :toolButton="false"
        :dataCallback="dataCallback"
        :columns="columns"
        :initParam="initParam"
        :requestApi="getInvLogList"
      ></ProTable>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <el-dialog
      title="手动上架库存"
      v-model="dialogInventoryVisible"
      width="30%"
    >
      <el-form ref="dataForm" label-width="150px" style="padding-right: 40px">
        <el-form-item label="上架仓库" prop="code">
          <el-input v-model="inventoryFormVo.warehouseName" :disabled="true" />
        </el-form-item>
        <el-form-item label="上架个数" prop="code">
          <el-input v-model="inventoryFormVo.count" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogInventoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateInventory()">
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref, reactive } from 'vue'
import { getInvLogList, updateInventory } from '@/api'
import type { InventoryInfo } from '@/api/inventory/types'
import { ColumnProps } from '@/components/ProTable/src/types'
import { ElMessage } from 'element-plus'

// 定义props类型
interface DialogProps {
  title: string
  rowData?: InventoryInfo.ResInventoryInfoItem
}

// *查询参数
const initParam = reactive({ goodsId: '' })

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80, fixed: 'left' },
  { prop: 'warehouseName', label: '操作仓库' },
  { prop: 'logTypeName', label: '日志类型' },
  { prop: 'alterationCount', label: '操作库存' },
  { prop: 'createTime', label: '操作时间' },
  { prop: 'remarks', label: '备注' },
]
const dialogVisible = ref(false)
const dialogInventoryVisible = ref(false)
const dialogProps = ref<DialogProps>({ title: '标题' })
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  if (params.title === '库存日志') {
    initParam.goodsId = params.rowData?.id as unknown as string
  }
}

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

const inventoryFormVo = ref()
const updateInventoryShow = (row: any) => {
  dialogInventoryVisible.value = true
  inventoryFormVo.value = row
}

const handleUpdateInventory = async () => {
  await updateInventory(inventoryFormVo.value)
  ElMessage.success('操作成功')
  dialogInventoryVisible.value = false
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
