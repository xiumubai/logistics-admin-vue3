<template>
  <el-drawer
    v-model="drawerVisible"
    :title="dialogProps.title"
    :destroy-on-close="true"
    size="60%"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="{ ...dialogProps.rowData, name, goodsTypeId }"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="盘点原因" prop="reasonId">
            <el-select
              v-model="invCounting.reasonId"
              placeholder="请选择盘点原因"
              style="width: 90%"
            >
              <el-option
                v-for="item in dialogProps?.reasonList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择库位" prop="wareIds">
            <el-cascader
              v-model="invCounting.wareIds"
              :options="dialogProps?.wareList"
              @change="queryDate"
              style="width: 90%"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划盘点时间" prop="planCountingTime">
            <el-date-picker
              style="width: 90%"
              v-model="invCounting.planCountingTime"
              type="datetime"
              placeholder="选择计划盘点时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="invCounting.remarks" style="width: 90%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h3>货品列表</h3>
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="inventoryInfoList"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column label="序号" width="70" align="center">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsInfo.name" label="货品名称" width="220" />
      <el-table-column prop="goodsInfo.code" label="商品编码" width="100" />
      <el-table-column prop="goodsInfo.barcode" label="商品条码" width="100" />
      <el-table-column
        prop="goodsInfo.goodsTypeName"
        label="商品类型"
        width="110px"
      />
      <el-table-column prop="totalCount" label="总库存" />
      <el-table-column prop="lockCount" label="锁定库存" />
      <el-table-column prop="availableCount" label="可用库存" />
      <el-table-column prop="pickingCount" label="已拣未发货数量" />
    </el-table>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="RoleDialog">
import type { GoodsInfo, GoodsType } from '@/api/base/types'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { findGoodsTypeIdList, findByStorehouseId } from '@/api'

const defaultForm = {
  id: '',
  invCountingNo: '',
  reasonId: '',
  planCountingTime: '',
  warehouseId: '',
  storeareaId: '',
  storeshelfId: '',
  countingUserId: '',
  countingUser: '',
  countingCompleteTime: '',
  remarks: '',
  invCountingItemList: [],
  wareIds: '',
  storehouseId: '',
}
// 定义props类型
interface DialogProps {
  title: string
  reasonList?: GoodsType.ResGoodsType[]
  wareList?: GoodsType.ResGoodsType[]
  rowData?: GoodsInfo.ResGoodsInfoItem
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// *表单校验规则
const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: '必须输入' }],
  code: [{ required: true, trigger: 'blur', message: '必须输入' }],
  barcode: [{ required: true, trigger: 'blur', message: '必须输入' }],
  goodsTypeId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  inspectTypeId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  temperatureTypeId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  brandName: [{ required: true, trigger: 'blur', message: '必须输入' }],
  unitId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  baseUnitId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  baseCount: [{ required: true, trigger: 'blur', message: '必须选择' }],
})

const goodsTypeId = ref()
const name = ref()
const drawerVisible = ref(false)
const inventoryInfoList = ref()
const loading = ref<boolean>(false)
const listLoading = ref(false)
const invCounting = reactive(defaultForm)
const multipleSelection = ref([]) // 批量选择中选择的记录列表
// props定义:title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({
  title: '',
  reasonList: [],
  wareList: [],
})

// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  drawerVisible.value = true
  if (params.title === '编辑') {
    name.value = dialogProps.value.rowData?.name
    // 商品类型在编辑的时候需要回显，id需要单独获取
    findGoodsTypeIdList(params?.rowData?.goodsTypeId as unknown as number).then(
      (res) => {
        goodsTypeId.value = res.data
      },
    )
  }
}

// *货品列表根据选择的库位来渲染
const queryDate = () => {
  invCounting.warehouseId = invCounting.wareIds[0]
  invCounting.storeareaId = invCounting.wareIds[1]
  invCounting.storeshelfId = invCounting.wareIds[2]
  invCounting.storehouseId = invCounting.wareIds[3]
  findByStorehouseId(invCounting.storehouseId).then((response) => {
    inventoryInfoList.value = response.data
    invCounting.invCountingItemList.forEach((it: any) => {
      inventoryInfoList.value.forEach((item: any) => {
        if (item.goodsId == it.goodsId) {
          //$refs.table.toggleRowSelection(it);
          // $nextTick(function () {
          //   $refs.table.toggleRowSelection(it, true)
          // })
        }
      })
    })
  })
}

const handleSelectionChange = (selection: any) => {
  if (selection.length > 0) {
    multipleSelection.value = selection
  }
}

// 表单提交
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(invCounting)
      ElMessage.success({ message: `${dialogProps.value.title}成功！` })
      dialogProps.value.getTableList!()
      drawerVisible.value = false
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
