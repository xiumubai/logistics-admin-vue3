<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogProps.title"
    :destroy-on-close="true"
    width="580px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="dialogProps.rowData"
    >
      <el-form-item label="库区名称" prop="name">
        <el-input
          v-model="dialogProps.rowData!.name"
          placeholder="请填写库区名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="仓库">
        <el-select
          v-model="dialogProps.rowData!.warehouseId"
          placeholder="请选择仓库"
        >
          <el-option
            v-for="item in dialogProps.housList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="库区类型">
        <el-select
          v-model="dialogProps.rowData!.areaTypeId"
          placeholder="请选择库区类型"
        >
          <el-option
            v-for="item in dialogProps.areaTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="面积(平方米)">
        <el-input v-model="dialogProps.rowData!.builtArea" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="dialogProps.rowData!.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="管理人" prop="manageName">
        <el-input
          v-model="dialogProps.rowData!.manageName"
          placeholder="管理人名称"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import type { WarehouseInfo, StoreareaInfo } from '@/api/ware/types'
import type { Dict } from '@/api/base/types'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
// 定义props类型
interface DialogProps {
  title: string
  rowData?: StoreareaInfo.ResStoreareaInfoItem
  areaTypeList: WarehouseInfo.ResWarehouseInfoItem[]
  housList: Dict.DictCodeItem[]
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const rules = reactive({
  name: [
    { required: true, message: '请填写名称' },
    { min: 2, message: '名称不能小于2位' },
  ],
})

const dialogVisible = ref(false)
const loading = ref<boolean>(false)

// props定义
// title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({
  title: '',
  areaTypeList: [],
  housList: [],
})

// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
}
// 表单提交
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!({ ...dialogProps.value.rowData })
      ElMessage.success({ message: `${dialogProps.value.title}成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
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
