<!--
 * @Description: 移库任务-完成
 * @Autor: codeBo
 * @Date: 2023-06-06 14:38:10
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-06 15:48:41
-->
<template>
  <el-dialog
    title="完成"
    v-model="$props.dialogVisible"
    width="90%"
    :before-close="() => emit('close')"
  >
    <div v-loading="loading">
      <div style="padding-bottom: 10px; font-weight: bold">基本信息</div>
      <el-card class="operate-container" shadow="never">
        <el-form ref="flashPromotionForm" label-width="100px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="移动原因">
                {{ invMove.reasonName }}
              </el-form-item>
              <el-form-item label="创建人">
                {{ invMove.createName }}
              </el-form-item>
              <el-form-item label="备注">
                {{ invMove.remarks }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划移动时间">
                {{ invMove.planCountingTime }}
              </el-form-item>
              <el-form-item label="创建时间">
                {{ invMove.createTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库位">
                {{ invMove.warehouseName }} {{ invMove.storehouseName }}
              </el-form-item>
              <el-form-item label="状态">
                {{ invMove.statusName }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <div>货品列表</div>
      <el-table
        ref="table"
        :data="inventoryInfoList"
        stripe
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column label="序号" width="70" align="center">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="goodsInfo.name" label="货品名称" width="220" />
        <el-table-column prop="goodsInfo.code" label="商品编码" width="90" />
        <el-table-column prop="goodsInfo.barcode" label="商品条码" width="90" />
        <el-table-column
          prop="goodsInfo.goodsTypeName"
          label="商品类型"
          width="100px"
        />
        <el-table-column prop="totalCount" label="总库存" />
        <el-table-column label="移库总库存" width="120">
          <template v-slot="scope">
            <el-input v-model="scope.row.moveTotalCount" />
          </template>
        </el-table-column>
        <el-table-column prop="pickingCount" label="已拣未发货数量" />
        <el-table-column label="差异量">
          <template v-slot="scope">
            {{
              Number.isNaN(scope.row.totalCount - scope.row.moveTotalCount)
                ? 0
                : scope.row.totalCount - scope.row.moveTotalCount
            }}
          </template>
        </el-table-column>
        <el-table-column label="指定库位" width="350px;">
          <template v-slot="scope">
            <el-cascader
              v-model="scope.row.wareIds"
              :options="wareList"
              style="width: 100%"
            ></el-cascader>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button @click="emit('close')">取 消</el-button>
      <el-button type="primary" @click="updateData">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, computed, onMounted, ref } from 'vue'
import { showMoveInfoById } from '@/api/index'
interface IProps {
  dialogVisible: boolean
  editId: number
  warehouseIdList: any
}
const props = defineProps<IProps>()
const emit = defineEmits(['close', 'submit'])

const wareList = computed(() => props.warehouseIdList)
const invMove = ref<any>({})
const inventoryInfoList = ref<any>([])
const loading = ref(false)
// 确定
const updateData = () => {
  emit('submit', { inventoryInfoList })
}
onMounted(async () => {
  const { data } = (await showMoveInfoById(props.editId)) as any
  invMove.value = data.invMove
  inventoryInfoList.value = data.inventoryInfoList
  inventoryInfoList.value.forEach(function (row: any) {
    invMove.value.invMoveItemList.forEach(function (item: any) {
      if (row.goodsId == item.goodsId) {
        row.wareIds = [
          item.moveWarehouseId,
          item.moveStoreareaId,
          item.moveStoreshelfId,
          item.moveStorehouseId,
        ]
        //row.totalCount = row.totalCount
        //row.moveTotalCount = row.totalCount
        //row.differenceCount = row.totalCount - row.moveTotalCount
      }
    })
  })
})
</script>
