<template>
  <el-dialog title="添加/修改" v-model="visible" width="90%">
    <div v-loading="loading">
      <el-card class="operate-container" shadow="never">
        <el-form
          ref="dataForm"
          :model="invMove"
          :rules="validateRules"
          label-width="110px"
          style="padding-right: 40px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="移库原因" prop="reasonId">
                <el-select
                  v-model="invMove.reasonId"
                  placeholder="请选择移库原因"
                  style="width: 90%"
                >
                  <el-option
                    v-for="item in reasonList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="选择库位" prop="wareIds">
                <el-cascader
                  v-model="invMove.wareIds"
                  :options="wareList"
                  @change="queryDate"
                  style="width: 90%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划移库时间" prop="planMoveTime">
                <el-date-picker
                  style="width: 90%"
                  v-model="invMove.planMoveTime"
                  type="datetime"
                  placeholder="选择计划移库时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="invMove.remarks" style="width: 90%" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <div class="title_box">货品列表</div>
      <el-table
        :v-loading="tableLoading"
        ref="table"
        :data="inventoryInfoList"
        stripe
        border
        style="width: 100%; margin-top: 10px"
        @selection-change="handleSelectionChange"
        @cell-click="cellclick"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="序号" width="70" align="center">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="goodsInfo.name" label="货品名称" width="220" />
        <el-table-column prop="goodsInfo.code" label="商品编码" width="100" />
        <el-table-column
          prop="goodsInfo.barcode"
          label="商品条码"
          width="100"
        />
        <el-table-column
          prop="goodsInfo.goodsTypeName"
          label="商品类型"
          width="100px"
        />
        <!--        <el-table-column prop="storehouseName" label="库位" width="130px"/>-->
        <el-table-column prop="totalCount" label="总库存" />
        <el-table-column prop="lockCount" label="锁定库存" />
        <el-table-column prop="pickingCount" label="已拣未发货数量" />
        <el-table-column label="指定库位" width="350px;">
          <template v-slot="scope">
            <el-cascader
              v-if="scope.row.isOK"
              v-model="scope.row.wareIds"
              :options="wareList"
              style="width: 100%"
            ></el-cascader>
            <span size="mini" v-else>不移库，不需指定</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  computed,
  reactive,
  ref,
  onMounted,
} from 'vue'
import type { FormRules } from 'element-plus'
import type { Dict } from '@/api/base/types'
import type { InOrderInfo } from '@/api/inbound/type'
import {
  findByDictCode,
  findNodesList,
  getInventoryInfoById,
  getInfoById,
} from '@/api/index'
interface IProps {
  dialogVisible: boolean
  title: string
  warehouseIdList: any
  type: string // edit or add
  editId?: number
}
const props = defineProps<IProps>()
const visible = computed(() => props.dialogVisible)
const emit = defineEmits(['close', 'submit'])
const close = () => {
  emit('close')
}
interface InvMove {
  id: string
  invMoveNo: string
  reasonId: string
  planMoveTime: string
  warehouseId: string
  storeareaId: string
  storeshelfId: string
  storehouseId: string
  moveUserId: string
  moveUser: string
  moveCompleteTime: string
  remarks: string
  wareIds: number[]
  invMoveItemList: Record<string, unknown>[] // 根据实际数据结构指定正确的类型
}

const invMove = ref<InvMove>({
  id: '',
  invMoveNo: '',
  reasonId: '',
  planMoveTime: '',
  warehouseId: '',
  storeareaId: '',
  storeshelfId: '',
  storehouseId: '',
  moveUserId: '',
  moveUser: '',
  moveCompleteTime: '',
  remarks: '',
  wareIds: [],
  invMoveItemList: [],
})
const loading = ref(true)
const reasonList = ref<Dict.DictCodeItem[]>([]) // 移库原因字典值
const wareList = ref<InOrderInfo.WarehouseNode[]>([]) // 树形结构
const inventoryInfoList = ref<any>([]) // 表格数据
const selectList = ref([]) // 多选的数据
const tableLoading = ref(false)
const validateRules = reactive<FormRules>({
  reasonId: [{ required: true, trigger: 'blur', message: '必须选择' }],
  planMoveTime: [{ required: true, trigger: 'blur', message: '必须选择' }],
  wareIds: [{ required: true, trigger: 'blur', message: '必须选择' }],
})
// 选择库位
const queryDate = () => {
  console.log('invMove', invMove.value.wareIds.at(-1))
  const currentId = invMove.value.wareIds.at(-1) as unknown as number
  queryList(currentId)
}
// 确定
const saveOrUpdate = () => {
  emit('submit', { invMove, selectList })
}
// 多选
const handleSelectionChange = (v: any) => {
  selectList.value = v
  console.log('v', v)
}
// 点击一行的时候触发
const cellclick = (s: any) => {
  console.log('s', s)
}
// 获取表格中的数据
const queryList = async (id: number) => {
  tableLoading.value = true
  const res = await getInventoryInfoById(id)
  inventoryInfoList.value = res.data
  tableLoading.value = false
  return Promise.resolve()
}
onMounted(async () => {
  const reason = await findByDictCode('Reason')
  reasonList.value = reason.data
  const nodeList = await findNodesList()
  wareList.value = nodeList.data
  if (props.type === 'edit' && props.editId) {
    const info = await getInfoById(props.editId)
    console.log('props', props.type, props.editId, info)
    const { data } = info
    const currentObj = Object.assign(data, {
      wareIds: [
        data.warehouseId,
        data.storeareaId,
        data.storeshelfId,
        data.storehouseId,
      ],
    })
    invMove.value = currentObj as unknown as InvMove
    await queryList(data.storehouseId)
  }
  loading.value = false
})
</script>
<style lang="scss">
.title_box {
  margin-top: 10px;
}
</style>
