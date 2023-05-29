<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getHospitalSetList"
      :initParam="initParam"
    >
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.User.add']"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  batchRemoveHospitalSet,
  getHospitalSetList,
  removeHospitalSet,
} from '@/api/hospital'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { HospitalSetListInterfaceRes } from '@/api/hospital/types'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 60 },
  // {
  //   prop: 'provinceCode',
  //   label: '所在省2',
  //   enum: computed(() => {
  //     return areaList.provinceList || []
  //   }) as unknown as EnumProps[],
  //   fieldNames: { label: 'name', value: 'value' },
  //   isShow: false,
  //   width: 100,
  //   search: {
  //     el: 'select',
  //   },
  // },
  // { type: 'index', label: '#', width: 80 },
  {
    prop: 'logoData',
    label: '医院LOGO',
    width: 100,
    render: ({ row }) => {
      return (
        <img
          style="width:80px;height80px"
          src={`data:image/png;base64,${row.logoData}`}
        />
      )
    },
  },
  { prop: 'id', label: 'id' },
  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
    search: { el: 'input', props: { placeholder: '输入医院名称' } },
  },
  {
    prop: 'hoscode',
    label: '医院编号',
    width: 100,
    search: { el: 'input', props: { placeholder: '输入医院编号' } },
  },
  { prop: 'apiUrl', label: 'api基础路径' },
  { prop: 'signKey', label: '签名' },
  { prop: 'contactsName', label: '联系人姓名' },
  { prop: 'contactsPhone', label: '联系人手机' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 150 },
]

// *查询参数
const initParam = reactive({})

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
// 编辑
const handleEdit = (row: any) => {
  console.log(row)
}
// 删除
const handleDelete = async (row: HospitalSetListInterfaceRes) => {
  await useHandleData(removeHospitalSet, row.id, `删除${row.hosname}`)
  proTable.value?.getTableList()
}
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchRemoveHospitalSet, ids, '删除所选信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
</script>
