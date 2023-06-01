<template>
  <div>
    <el-card>
      <div style="padding-bottom: 10px; font-weight: bold">波次配置</div>
      <el-form
        ref="flashPromotionForm"
        label-width="180px"
        size="small"
        style="padding-right: 40px"
      >
        <!-- <el-form label-width="180px" size="small" style="padding-right: 40px">
          <el-form-item label="波次维度">
            <el-radio-group v-model="wareConfig?.dimension">
              <el-radio label="STORESHELF">货架</el-radio>
              <el-radio label="STOREHOUSE">库位</el-radio>
              <el-radio label="GOODS">商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="波次间隔时间（分钟）">
            <el-input v-model="wareConfig?.intervalTime" />
          </el-form-item>
        </el-form> -->
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div style="padding-bottom: 10px; font-weight: bold">关联SKU配置</div>
    </el-card>
    <br />
    <span class="dialog-footer">
      <!-- <el-button type="primary" @click="saveData()" size="small">
        确 定
      </el-button> -->
    </span>
  </div>
</template>
<script setup lang="ts">
// import type { IWareConfig } from '@/api/config/types'
// import { ref, onMounted } from 'vue'
// import { getWareConfig } from '@/api'

// const wareConfig: IWareConfig.ResWareConfig = ref({
//   dimension: '',
// })

// const saveData = () => {}

// onMounted(async () => {
//   const res = await getWareConfig()
//   console.log(res.data)
//   wareConfig.value = res.data
// })
</script>

<style lang="scss" scoped></style>
