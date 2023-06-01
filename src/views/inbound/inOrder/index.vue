<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInOrderInfoList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.warehouseInfo.add']"
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
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
          @click="openDialog('编辑', scope.row)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
  </div>
</template>
<script setup lang="tsx">
import { reactive, ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import {
  findByDictCode,
  addWarehouseInfo,
  getAllSelectList,
  updateWarehouseInfo,
  getInOrderInfoList,
} from '@/api'
import type { Dict } from '@/api/base/types'
import type { WarehouseInfo } from '@/api/ware/types'
const { BUTTONS } = useAuthButtons()

// 地区数据
const dictList = reactive({
  // 省份数据
  provinceList: [] as Dict.DictCodeItem[],
  warehouseList: [] as any, // 指定仓库数据
})

// *表格配置项
const columns: ColumnProps[] = [
  {
    prop: 'no',
    isShow: false,
    label: '相关单号',
    search: { el: 'input', props: { placeholder: '入库单号/货主订单号' } },
  },
  {
    prop: 'warehouseId',
    isShow: false,
    label: '指定仓库',
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select v-model={dictList.warehouseList} placeholder="请选择">
            {dictList.provinceList?.map((item: any) => (
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
  { type: 'index', label: '序号', width: 80 },
  { prop: 'inOrderNo', label: '入库单号' },
  { prop: 'shipperOrderNo', label: '货主订单号', width: 120 },
  { prop: 'shipperName', label: '货主名称' },
  { prop: 'estimatedArrivalTime', label: '预计到达日', width: 120 },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'driver', label: '司机' },
  { prop: 'driverPhone', label: '司机电话' },
  { prop: 'expectCount', label: '预期到货数量' },
  {
    prop: 'statusName',
    label: '状态',
  },
  { prop: 'createTime', label: '创建时间' },
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
      ? hasAuth('btn.warehouseInfo.add')
      : hasAuth('btn.warehouseInfo.update')
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
// 获取初始数据
const getProvinceListHandle = async () => {
  try {
    const res = await findByDictCode('Province')

    const res2 = await getAllSelectList()
    console.log('res', res, res2)
    dictList.provinceList = res.data
    dictList.warehouseList = res.data
  } catch (error) {
    console.log(error)
  }
}

/* 生命周期 */
onMounted(async () => {
  await getProvinceListHandle()
})
</script>

<style lang="scss" scoped></style>
