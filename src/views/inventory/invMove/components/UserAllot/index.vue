<!--
 * @Description: 分配任务弹窗
 * @Autor: codeBo
 * @Date: 2023-06-06 11:15:14
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-06 11:41:23
-->
<template>
  <el-dialog title="分配任务" v-model="visible" width="40%">
    <el-form
      ref="assignUserForm"
      label-width="120px"
      style="padding-right: 40px"
    >
      <el-form-item label="任务执行人">
        <el-autocomplete
          v-model="invMoveTaskFormVo.countingUser"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelect"
          class="inline-input"
          placeholder="搜索任务执行人"
          value-key="name"
          style="width: 100%"
        />
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-input__icon el-icon-search"></i>
          </span>
        </span>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取 消</el-button>
      <el-button type="primary" @click="assignUserSave">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue'
import { findByKeyWord } from '@/api/index'
interface IProps {
  dialogUserVisible: boolean
}
const props = defineProps<IProps>()
const visible = computed(() => props.dialogUserVisible)
const emit = defineEmits(['close', 'submit'])
const invMoveTaskFormVo = ref({
  invMoveId: null,
  countingUser: '',
  countingUserId: '',
  moveUserId: '',
  moveUser: '',
})
const assignUserSave = () => {
  emit('submit')
}
const querySearch = (queryString: string, cb: (T: any) => void) => {
  findByKeyWord(queryString).then((res) => {
    cb(res.data)
  })
}
const handleSelect = (item: any) => {
  invMoveTaskFormVo.value.moveUserId = item.id
  invMoveTaskFormVo.value.moveUser = item.name
}
</script>
