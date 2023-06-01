<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getGoodsInfoList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.goodsInfo.add']"
          @click="openDialog('新增')"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.goodsInfo.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.goodsInfo.remove']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Top"
          @click="handleUpdateStatus(scope.row.id, 1)"
        >
          上线
        </el-button>
        <el-button
          type="primary"
          icon="Bottom"
          link
          v-if="scope.row.status == 1"
          @click="handleUpdateStatus(scope.row.id, -1)"
        >
          下线
        </el-button>
      </template>
    </ProTable>
    <Drawer ref="DrawerRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { ElMessage } from 'element-plus'
import {
  getGoodsInfoList,
  getGoodsNodeList,
  updateStatus,
  deleteGoodsById,
  addShipper,
  updateShipper,
  findByDictCode,
  getConfig,
} from '@/api'
import type { GoodsInfo } from '@/api/base/types'
import Drawer from './components/Drawer.vue'

const { BUTTONS } = useAuthButtons()

const statusList = [
  { id: 0, name: '新建' },
  { id: 1, name: '启用' },
  { id: -1, name: '下线' },
]

const goodsTypeList = ref()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'keyword',
    label: '关键字',
    isShow: false,
    search: { el: 'input', props: { placeholder: '货品名称/编码/条码' } },
  },
  {
    prop: 'goodsTypeId',
    label: '商品类型',
    isShow: false,
    enum: getGoodsNodeList,
    search: {
      el: 'cascader',
      props: { placeholder: '请选择商品类型' },
    },
  },
  {
    prop: 'status',
    label: '状态',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select v-model={status} placeholder="请选择区" clearable>
            {statusList.map((item) => (
              <el-option
                key={item.id}
                label={item.name}
                value={item.id}
              ></el-option>
            ))}
          </el-select>
        )
      },
    },
  },
  { prop: 'name', label: '名称' },
  { prop: 'skuId', label: '关联SKU', width: 100 },
  { prop: 'code', label: '商品编码', width: 100 },
  { prop: 'barcode', label: '商品条码', width: 100 },
  { prop: 'goodsTypeName', label: '商品类型', width: 100 },
  { prop: 'brandName', label: '品牌' },
  { prop: 'saleAttr', label: '销售属性', width: 100 },
  { prop: 'inspectTypeName', label: '检验类型', width: 100 },
  { prop: 'temperatureTypeName', label: '温度类型', width: 100 },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return (
        <el-tag>
          {row.status === 0 ? '新建' : row.status == 1 ? '启用' : '下线'}
        </el-tag>
      )
    },
  },
  { prop: 'createTime', label: '创建时间', width: 100 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

const inspectTypeList = ref()
const temperatureTypeList = ref()
const unitList = ref()
const api_url = ref()
// 打开Dialog
const DrawerRef = ref()
const openDialog = async (
  title: string,
  rowData: Partial<GoodsInfo.ResGoodsInfoItem> = {},
) => {
  // 检查是否有操作权限
  const isAuth =
    title === '新增'
      ? hasAuth('btn.goodsInfo.add')
      : hasAuth('btn.goodsInfo.update')
  await useAuth(isAuth)

  const params = {
    title: title,
    goodsTypeList: goodsTypeList.value,
    inspectTypeList: inspectTypeList.value,
    temperatureTypeList: temperatureTypeList.value,
    unitList: unitList.value,
    rowData: { ...rowData },
    api_url: api_url.value,
    api: title === '新增' ? addShipper : updateShipper,
    getTableList: proTable.value?.getTableList,
  }
  DrawerRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: GoodsInfo.ResGoodsInfoItem) => {
  await useAuth(hasAuth('btn.goodsInfo.remove'))
  await useHandleData(deleteGoodsById, row.id, `删除${row.name}商品`)
  proTable.value?.getTableList()
}

// *上线，下线
const handleUpdateStatus = async (id: string, status: number) => {
  await updateStatus(id, status)
  ElMessage.success(`${status === 1 ? '上线成功' : '下线成功'}`)
  proTable.value?.getTableList()
}

// 获取货物类型数据
const featchGoodsTypeList = async () => {
  const res = await getGoodsNodeList()
  goodsTypeList.value = res.data
}

// 初始化原始数据
const init = () => {
  // 检验类型
  findByDictCode('InspectType').then((res) => {
    inspectTypeList.value = res.data
  })
  // 温度类型
  findByDictCode('TemperatureType').then((res) => {
    temperatureTypeList.value = res.data
  })
  // 单位
  findByDictCode('Unit').then((res) => {
    unitList.value = res.data
  })
  // 获取接口路径
  getConfig().then((res) => {
    api_url.value = res.data?.relationUrl
  })
}

/* 生命周期 */
onMounted(() => {
  init()
  featchGoodsTypeList()
})
</script>

<style lang="scss" scoped></style>
