<template>
  <div>
    <el-card style="margin-bottom: 16px">
      <h2>波次配置</h2>
      <el-form>
        <el-form>
          <el-form-item label="波次维度">
            <el-radio-group v-model="wareConfig.dimension">
              <el-radio label="STORESHELF">货架</el-radio>
              <el-radio label="STOREHOUSE">库位</el-radio>
              <el-radio label="GOODS">商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="波次间隔时间（分钟）">
            <el-input v-model="wareConfig.intervalTime" />
          </el-form-item>
        </el-form>
      </el-form>
    </el-card>
    <el-card>
      <h2>关联SKU配置</h2>
      <el-form>
        <el-form-item label="关联SKU分页列表URL">
          <el-input v-model="wareConfig.relationUrl" />
          <p>说明：</p>
          <p>
            1、URL格式必须包含分页参数，如：http://[域名或IP:端口]/[路径]/{page}/{pageSize}
          </p>
          <p>
            2、分页返回数据对象：Result.ok(com.baomidou.mybatisplus.core.metadata.IPage)
          </p>
        </el-form-item>
      </el-form>
    </el-card>
    <div style="text-align: center; margin: 16px 0">
      <el-button type="primary" @click="saveData()">确 定</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getWareConfig, updateWareConfig } from '@/api'
import { ElMessage } from 'element-plus'

const wareConfig = ref<any>({
  dimension: '',
  intervalTime: '',
})

const saveData = async () => {
  await updateWareConfig(wareConfig.value)
  ElMessage({
    type: 'success',
    message: '修改成功',
  })
}

onMounted(async () => {
  const res = await getWareConfig()
  wareConfig.value = res.data
})
</script>

<style lang="scss" scoped></style>
