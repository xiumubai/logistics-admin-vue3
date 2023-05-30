<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogProps.title"
    :destroy-on-close="true"
    width="580px"
    @close="close"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="dialogProps.rowData"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="dialogProps.rowData!.name"
          placeholder="请填写名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="dialogProps.rowData!.phone"
          placeholder="请填写手机号码"
          clearable
        ></el-input>
      </el-form-item>

      <!-- 地址 -->
      <el-form-item label="省" prop="provinceId">
        <el-select
          v-model="code.provinceId"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in dialogProps.provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="市" prop="cityId">
        <el-select
          v-model="code.cityId"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in dict.cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区" prop="areaId">
        <el-select v-model="code.areaId" placeholder="请选择区">
          <el-option
            v-for="item in dict.areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          v-model="dialogProps.rowData!.address"
          placeholder="请填写详细地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="dialogProps.rowData!.remark"
          placeholder="请填写备注"
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
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { Shipper, Dict } from '@/api/base/types'
import { findByParentId } from '@/api'
// 定义props类型
interface DialogProps {
  title: string
  provinceList: Dict.DictCodeItem[]
  rowData?: Shipper.EidtShipperParams
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const rules = reactive({
  name: [
    { required: true, message: '请填写名称' },
    { min: 2, message: '名称不能小于2位' },
  ],
})

const dict = reactive({
  cityList: [] as Dict.DictCodeItem[],
  areaList: [] as Dict.DictCodeItem[],
})

const code = reactive({
  provinceId: '',
  cityId: '',
  areaId: '',
})

const dialogVisible = ref(false)
const loading = ref<boolean>(false)

// props定义
// title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({ title: '', provinceList: [] })

// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  console.log(params.rowData)

  // 编辑-省市区默认值
  if (params.title === '编辑') {
    code.provinceId = params.rowData?.provinceId as unknown as string
    code.cityId = params.rowData?.cityId as unknown as string
    code.areaId = params.rowData?.areaId as unknown as string
    // 单独获取城市和区域的列表数据
    fetchSelectData()
  }
}

const fetchSelectData = async () => {
  const cityRes = await findByParentId(code.provinceId)
  dict.cityList = cityRes.data
  const areaRes = await findByParentId(code.cityId)
  dict.areaList = areaRes.data
}

// 表单提交
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!({ ...dialogProps.value.rowData, ...code })
      ElMessage.success({ message: `${dialogProps.value.title}成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
      loading.value = false
      clearAll()
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

// 关闭弹窗

const close = () => {
  clearAll()
}

// 修改省份的数据
const provinceChanged = async () => {
  try {
    const res = await findByParentId(code.provinceId)
    // 修改了省份，清空城市和区域的数据
    clearCity()
    dict.cityList = res.data
  } catch (error) {
    console.log(error)
  }
}

// 修改市的数据
const cityChanged = async () => {
  const res = await findByParentId(code.cityId)
  // 修改了城市，清空区域的数据
  clearArea()
  dict.areaList = res.data
}

// 清空省市区数据
const clearAll = () => {
  code.provinceId = ''
  clearCity()
}

// 清除城市数据
const clearCity = () => {
  dict.cityList = []
  code.cityId = ''
  clearArea()
}
// 清除区域数据
const clearArea = () => {
  dict.areaList = []
  code.areaId = ''
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
