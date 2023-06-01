<template>
  <el-card>
    <el-table
      :data="list"
      :load="getChildrens"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
      row-key="id"
      border
      lazy
    >
      <el-table-column label="名称" style="width: 33%" align="left">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGoodsTypeList, getGoodsNodeList } from '@/api'
import { GoodsType } from '@/api/base/types'
import { TreeNode } from 'element-plus'

let list = ref()

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  const res = await getGoodsNodeList()
  list.value = res.data
}

const getChildrens = async (
  tree: GoodsType.ResGoodsType,
  treeNode: TreeNode,
  resolve: (data: GoodsType.ResGoodsType[]) => void,
) => {
  const res = await getGoodsTypeList(tree.id)
  resolve(res.data)
}
</script>

<style lang="scss" scoped></style>
