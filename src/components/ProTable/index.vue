<template>
  <div class="pro-table">
    <div class="pro-table-header"></div>

    <div class="pro-table-body">
      <el-table
        :data="props.dataSource"
        style="width: 100%"
        v-loading="props.loading"
      >
        <template v-for="column in props.columns" :key="column.key">
          <el-table-column
            :prop="column.key"
            :label="column.label"
            :width="column.width"
          >
            <template #default="scope" v-if="column.slot">
              <slot :name="column.key" :row="scope.row" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="pro-table-footer">
      <el-pagination
        background
        v-model:current-page="currentPage"
        layout="total,prev, pager, next"
        :total="props.pagination.total"
        :page-size="props.pagination.size"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({})
  }
})
const currentPage = ref(props.pagination.current || 1)
const handleCurrentChange = (currentPage) => {
  props.pagination.onPageChange(currentPage)
}
const handleSizeChange = (size) => {
  props.pagination.onPageSizeChange(size)
}
</script>
<style lang="scss" scoped>
.pro-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pro-table-body {
    width: 100%;
    flex: 1;
  }
  .pro-table-footer {
    margin-top: 12px;
  }
}
</style>
