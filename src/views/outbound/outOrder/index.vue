<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getOutOrderList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Link"
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
          @click="goShow(scope.row.id)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { getOutOrderList, findWarehouseInfoAll, findByDictCode } from '@/api'
import { useRouter } from 'vue-router'
import type { WarehouseInfo } from '@/api/ware/types'
import type { Dict } from '@/api/base/types'
const router = useRouter()
const { BUTTONS } = useAuthButtons()
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'outOrderNo', label: '出库单号' },
  { prop: 'consignee', label: '收货人' },
  { prop: 'consigneeTel', label: '收件人电话' },
  { prop: 'deliveryAddress', label: '送货地址', width: 120 },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'statusName', label: '状态', width: 120 },
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

const goShow = (id: string) => {
  router.push({
    path: `/outbound/outOrder/show/${id}`,
  })
}

const initList = reactive({
  houseList: [] as WarehouseInfo.ResWarehouseInfoItem[],
  areaTypeList: [] as Dict.DictCodeItem[],
})

// 获取省份数据
const init = () => {
  findWarehouseInfoAll().then((res) => {
    initList.houseList = res.data
  })
  findByDictCode('AreaType').then((res) => {
    initList.areaTypeList = res.data
  })
}

/* 生命周期 */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>
