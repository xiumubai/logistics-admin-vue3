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
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import {
  addWarehouseInfo,
  findWarehouseInfoAll,
  updateWarehouseInfo,
  getInOrderInfoList,
} from '@/api'
import type { WarehouseInfo } from '@/api/ware/types'
const { BUTTONS } = useAuthButtons()
const statusList = [
  { id: 0, name: '新建' },
  { id: 1, name: '审批中' },
  { id: 2, name: '收货中' },
  { id: 3, name: '上架中' },
  { id: 4, name: '库存同步中' },
  { id: 5, name: '完成' },
  { id: -1, name: '审批驳回' },
]
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
    enum: findWarehouseInfoAll,
    fieldNames: { label: 'name', value: 'id' },
    search: { el: 'select', props: { placeholder: '请选择指定仓库' } },
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
</script>

<style lang="scss" scoped></style>
