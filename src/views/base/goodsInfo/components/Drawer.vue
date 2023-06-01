<template>
  <el-drawer
    v-model="drawerVisible"
    :title="dialogProps.title"
    :destroy-on-close="true"
    size="600px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="{ ...dialogProps.rowData, name, goodsTypeId }"
    >
      <el-form-item label="货品名称" prop="name">
        <el-input
          type="textarea"
          :disabled="true"
          v-model="name"
          placeholder="请填写货品名称"
          clearable
        ></el-input>
        <el-button
          type="primary"
          size="small"
          style="margin-top: 12px"
          @click="showSkuData()"
        >
          选择SKU
        </el-button>
      </el-form-item>
      <el-form-item label="商品编码" prop="code">
        <el-input
          v-model="dialogProps.rowData!.code"
          placeholder="请填写商品编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="goodsTypeId">
        <el-cascader
          v-model="goodsTypeId"
          :options="dialogProps.goodsTypeList"
          style="width: 100%"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="温度类型" prop="temperatureTypeId">
        <el-select
          v-model="dialogProps.rowData!.temperatureTypeId"
          placeholder="请选择温度类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in dialogProps.temperatureTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="体积">
        <el-input v-model="dialogProps.rowData!.volume" />
      </el-form-item>
      <el-form-item label="单位" prop="unitId">
        <el-select
          v-model="dialogProps.rowData!.unitId"
          placeholder="请选择单位"
          style="width: 100%"
        >
          <el-option
            v-for="item in dialogProps.unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="拆零数量" prop="baseCount">
        <el-input v-model="dialogProps.rowData!.baseCount" />
      </el-form-item>
      <el-form-item label="条码" prop="barcode">
        <el-input v-model="dialogProps.rowData!.barcode" />
      </el-form-item>
      <el-form-item label="品牌" prop="brandName">
        <el-input v-model="dialogProps.rowData!.brandName" />
      </el-form-item>
      <el-form-item label="检验类型" prop="inspectTypeId">
        <el-select
          v-model="dialogProps.rowData!.inspectTypeId"
          placeholder="请选择检验类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in dialogProps.inspectTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="销售属性" prop="saleAttr">
        <el-input v-model="dialogProps.rowData!.saleAttr" />
      </el-form-item>
      <el-form-item label="重量" prop="weight">
        <el-input v-model="dialogProps.rowData!.weight" />
      </el-form-item>
      <el-form-item label="拆零最小单位" width="100px" prop="baseUnitId">
        <el-select
          v-model="dialogProps.rowData!.baseUnitId"
          placeholder="请选择单位"
          style="width: 100%"
        >
          <el-option
            v-for="item in dialogProps.unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
    <Dialog ref="DialogRef" @update-name="handleChange" />
  </el-drawer>
</template>

<script setup lang="ts" name="RoleDialog">
import type { GoodsInfo, GoodsType, Dict } from '@/api/base/types'
import type { ReqPage } from '@/api/types'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { findGoodsTypeIdList } from '@/api'
import axios from 'axios'
import Dialog from './Dialog.vue'
// 定义props类型
interface DialogProps {
  title: string
  goodsTypeList?: GoodsType.ResGoodsType[]
  inspectTypeList?: Dict.DictCodeItem[]
  temperatureTypeList?: Dict.DictCodeItem[]
  unitList?: Dict.DictCodeItem[]
  rowData?: GoodsInfo.ResGoodsInfoItem
  api_url: string
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
const loading = ref<boolean>(false)

// props定义:title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({
  title: '',
  goodsTypeList: [],
  inspectTypeList: [],
  temperatureTypeList: [],
  unitList: [],
  api_url: '',
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

// 表单提交
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!({
        ...dialogProps.value.rowData,
        goodsTypeId: goodsTypeId.value[2],
        name: name.value,
      })
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

// 打开Dialog
const DialogRef = ref()
const showSkuData = () => {
  const params = {
    api: getProductList,
  }
  DialogRef.value.acceptParams(params)
}

// handleChange
const handleChange = (value: string[]) => {
  name.value = value.join(' ')
}

const getProductList = async (params: ReqPage) => {
  // 默认返回的接口地址是"http://sph-api.atguigu.cn/admin/product/list/1/10"
  // 需要把分页参数替换成动态的
  const url = dialogProps.value.api_url
  const urlParts = url.split('/')
  const baseUrl = urlParts.slice(0, urlParts.length - 2).join('/')
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/${params.pageNum}/${params.pageSize}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
