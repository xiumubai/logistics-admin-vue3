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
      <el-table-column label="编码" style="width: 33%">
        <template v-slot="{ row }">
          {{ row.dictCode }}
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
import { onMounted, ref } from 'vue'
import { findByParentId } from '@/api'
import type { Dict } from '@/api/base/types'
import type { TreeNode } from 'element-plus'
const list = ref()
onMounted(async () => {
  fetchData()
})

const fetchData = async () => {
  const res = await findByParentId(1)
  list.value = res.data
}

const getChildrens = async (
  tree: Dict.DictCodeItem,
  treeNode: TreeNode,
  resolve: (data: Dict.DictCodeItem[]) => void,
) => {
  const res = await findByParentId(tree.id)
  resolve(res.data)
}
</script>

<style lang="scss" scoped></style>
