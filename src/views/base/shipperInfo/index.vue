<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getShipperList"
      :resetCallback="clearAll"
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
  getShipperList,
  deleteShipperById,
  findByParentId,
  findByProvince,
  addShipper,
  updateShipper,
} from '@/api'
import type { Shipper, Dict } from '@/api/base/types'
import Dialog from './components/Dialog.vue'
const { BUTTONS } = useAuthButtons()

// 地区数据
const dictList = reactive({
  // 省份数据
  provinceList: [] as Dict.DictCodeItem[],
  provinceCode: '',
  // 市区数据
  cityList: [] as Dict.DictCodeItem[],
  cityCode: '',
  // 区县数据
  areaList: [] as Dict.DictCodeItem[],
  areaCode: '',
})

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'provinceCode',
    label: '所在省',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select
            v-model={dictList.provinceCode}
            placeholder="请选择省"
            onChange={getCityList}
          >
            {dictList.provinceList.map((item) => (
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
  {
    prop: 'cityCode',
    label: '所在市',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select
            v-model={dictList.cityCode}
            placeholder="请选择市"
            onChange={getAreatList}
          >
            {dictList.cityList.map((item) => (
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
  {
    prop: 'areaCode',
    label: '所在区',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select v-model={dictList.areaCode} placeholder="请选择市">
            {dictList.areaList.map((item) => (
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
  {
    prop: 'keyword',
    label: '关键字',
    isShow: false,
    search: { el: 'input', props: { placeholder: '姓名/手机号' } },
  },
  { prop: 'name', label: '名称' },
  { prop: 'phone', label: '手机号码' },
  { prop: 'provinceName', label: '省' },
  { prop: 'cityName', label: '市' },
  { prop: 'areaName', label: '区' },
  { prop: 'address', label: '详细地址' },
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

// 打开Dialog
const DialogRef = ref()
const openDialog = async (
  title: string,
  rowData: Partial<Shipper.ShipperResItem> = {},
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
    api: title === '新增' ? addShipper : updateShipper,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 获取省份数据
const getProvinceListHandle = async () => {
  try {
    const res = await findByProvince('Province')
    dictList.provinceList = res.data
  } catch (error) {
    console.log(error)
  }
}

// 获取城市数据
const getCityList = async () => {
  const res = await findByParentId(dictList.provinceCode)
  // 修改了省份，清空城市和区域的数据
  clearCity()
  dictList.cityList = res.data
}

// 获取区域数据
const getAreatList = async () => {
  const res = await findByParentId(dictList.cityCode)
  // 修改了城市，清空区域的数据
  clearArea()
  dictList.areaList = res.data
}

// 点击重置的时候，清除省/市/区的数据
const clearAll = () => {
  dictList.provinceList = []
  dictList.provinceCode = ''
  clearCity()
}
// 清除城市数据
const clearCity = () => {
  dictList.cityList = []
  dictList.cityCode = ''
  clearArea()
}
// 清除区域数据
const clearArea = () => {
  dictList.areaList = []
  dictList.areaCode = ''
}

// *根据id删除用户
const handleDelete = async (row: Shipper.ShipperResItem) => {
  await useAuth(hasAuth('btn.shipperInfo.remove'))
  await useHandleData(deleteShipperById, row.id, `删除${row.name}用户`)
  proTable.value?.getTableList()
}

/* 生命周期 */
onMounted(async () => {
  await getProvinceListHandle()
})
</script>

<style lang="scss" scoped></style>
