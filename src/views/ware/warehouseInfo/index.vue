<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getWarehouseInfoList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.shipperInfo.add']"
          @click="openDialog('新增')"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.shipperInfo.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.shipperInfo.remove']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { reactive, ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import {
  getWarehouseInfoList,
  deleteWarehouseInfoById,
  findByDictCode,
  addWarehouseInfo,
  updateWarehouseInfo,
} from '@/api'
import type { Dict } from '@/api/base/types'
import type { WarehouseInfo } from '@/api/ware/types'
import Dialog from './components/Dialog.vue'
const { BUTTONS } = useAuthButtons()

// 地区数据
const dictList = reactive({
  // 省份数据
  provinceList: [] as Dict.DictCodeItem[],
})

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'name', label: '名称' },
  {
    prop: 'type',
    label: '仓库类型',
    render: ({ row }) => {
      return <span>{row.type == 1 ? '中心仓库' : '区域仓库'}</span>
    },
  },
  {
    prop: 'address',
    label: '仓库地址',
    render: ({ row }) => {
      return (
        <span>
          {row.provinceName}
          {row.cityName}
          {row.areaName}
          {row.address}
        </span>
      )
    },
  },
  { prop: 'builtArea', label: '面积(平方米)', width: 120 },
  { prop: 'manageName', label: '管理人' },
  { prop: 'managePhone', label: '管理人手机号', width: 120 },
  { prop: 'storeareaCount', label: '库区个数' },
  { prop: 'storeshelfCount', label: '货架个数' },
  { prop: 'storehouseCount', label: '库位个数' },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return <el-tag>{row.status === 1 ? '启用' : '停用'}</el-tag>
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 180 },
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

// 打开Dialog
const DialogRef = ref()
const openDialog = async (
  title: string,
  rowData: Partial<WarehouseInfo.ResWarehouseInfoItem> = {},
) => {
  const isAuth =
    title === '新增'
      ? hasAuth('btn.shipperInfo.add')
      : hasAuth('btn.shipperInfo.update')
  await useAuth(isAuth)

  const params = {
    title: title,
    provinceList: dictList.provinceList, // 省份的数据需要单独传递
    rowData: { ...rowData },
    api: title === '新增' ? addWarehouseInfo : updateWarehouseInfo,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 获取省份数据
const getProvinceListHandle = async () => {
  try {
    const res = await findByDictCode('Province')
    dictList.provinceList = res.data
  } catch (error) {
    console.log(error)
  }
}
// *根据id删除用户
const handleDelete = async (row: WarehouseInfo.ResWarehouseInfoItem) => {
  await useAuth(hasAuth('btn.shipperInfo.remove'))
  await useHandleData(deleteWarehouseInfoById, row.id, `删除${row.name}用户`)
  proTable.value?.getTableList()
}

/* 生命周期 */
onMounted(async () => {
  await getProvinceListHandle()
})
</script>

<style lang="scss" scoped></style>
