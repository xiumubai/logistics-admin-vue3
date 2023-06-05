<!--
 * @Description: 新增入库预约
 * @Autor: codeBo
 * @Date: 2023-06-01 18:05:13
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-05 10:00:38
-->
<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :destroy-on-close="true"
    width="1280px"
    @close="close"
  >
    <div style="margin-bottom: 10px">基本信息</div>
    <el-card shadow="never">
      <el-form
        ref="ruleFormRef"
        label-width="150"
        :rules="rules"
        :inline="true"
        label-position="right"
        status-icon
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="货主名称" prop="shipperName">
          <el-select
            v-model="formInline.shipperName"
            filterable
            remote
            reserve-keyword
            placeholder="搜索"
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="nameLoading"
          >
            <el-option
              v-for="item in shipperNameOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="货主订单号" prop="shipperOrderNo">
          <el-input
            v-model="formInline.shipperOrderNo"
            placeholder="搜索货主名称"
          />
        </el-form-item>
        <el-form-item label="预计到达日">
          <el-col :span="24">
            <el-date-picker
              v-model="formInline.estimatedArrivalTime"
              type="date"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="指定仓库" prop="warehouseName">
          <el-select v-model="formInline.warehouseName" placeholder="请输入">
            <el-option
              v-for="item in warehouseIdList"
              :label="item!.name"
              :key="item!.id"
              :value="item!.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="司机" label-width="150">
          <el-input v-model="formInline.driver" placeholder="输入司机名称" />
        </el-form-item>
        <el-form-item label="司机电话">
          <el-col :span="24">
            <el-input
              v-model="formInline.driverPhone"
              placeholder="输入司机电话"
            />
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card
      shadow="never"
      style="margin: 10px 0"
      body-style="display:flex;align-items: center;justify-content: space-between;"
    >
      <div>货品列表</div>
      <el-button @click="addGoodsHandler">添加货品</el-button>
    </el-card>
    <el-table :data="dataSource" style="width: 100%" :border="true">
      <el-table-column label="名称">
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column label="商品编码" prop="a" />
      <el-table-column label="商品条码" prop="b" />
      <el-table-column label="温度类型" prop="c" />
      <el-table-column label="到货数量">
        <template #default="scope">
          <el-input
            type="number"
            v-model="scope.row.counts"
            placeholder="请输入"
          />
        </template>
      </el-table-column>
      <el-table-column label="单位" prop="d" />
      <el-table-column label="拆零数量" prop="e" />
      <el-table-column label="拆零单价（元）">
        <template #default="scope">
          <el-input
            type="number"
            v-model="scope.row.price"
            placeholder="请输入"
          />
        </template>
      </el-table-column>
      <el-table-column label="总价（元）" prop="f" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="hanldDelete(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="submitHandle(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getFindKeyWordList } from '@/api'
import type { InOrderInfo } from '@/api/inbound/type'
const ruleFormRef = ref<FormInstance>()

interface IProps {
  dialogVisible: boolean
  title: string
  warehouseIdList: InOrderInfo.Warehouse[]
}
const props = defineProps<IProps>()

const visible = computed(() => props.dialogVisible)
const emit = defineEmits(['close', 'submit'])
const close = () => {
  emit('close')
}
const formInline = reactive({
  shipperName: '',
  shipperOrderNo: '',
  estimatedArrivalTime: '',
  warehouseName: '',
  driver: '',
  driverPhone: '',
})
const rules = reactive<FormRules>({
  shipperName: [{ required: true, message: '必须输入', trigger: 'blur' }],
  warehouseName: [{ required: true, message: '必须输入', trigger: 'blur' }],
  shipperOrderNo: [{ required: true, message: '必须输入', trigger: 'blur' }],
})
// 搜索部分
const nameLoading = ref<boolean>(false)
const shipperNameOptions = ref<InOrderInfo.Warehouse[]>([])
const remoteMethod = async (query: string) => {
  if (query) {
    nameLoading.value = true
    const res = await getFindKeyWordList(query)
    if (res.code === 200) {
      shipperNameOptions.value = res.data
    }
    nameLoading.value = false
  } else {
    shipperNameOptions.value = []
  }
}
// 默认新增行
const defaultItem = {
  a: '',
  b: '',
  c: '',
  d: '',
  e: 0,
  f: 0,
  name: '',
  price: 0,
  counts: 0,
}
// 表格部分
const dataSource = ref([{ ...defaultItem }])
const addGoodsHandler = () => {
  dataSource.value.push({ ...defaultItem })
}
const hanldDelete = (index: number) => {
  dataSource.value = dataSource.value.filter((item, i) => i !== index)
}
const submitHandle = async (formEl: FormInstance | undefined) => {
  emit('submit', { dataSource, formInline })
  if (!formEl) return
  await formEl?.validate((valid) => {
    if (valid) {
      // 验证成功
    }
  })
}
</script>
