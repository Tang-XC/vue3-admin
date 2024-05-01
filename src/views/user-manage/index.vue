<template>
  <div class="user-manage">
    <ProTable
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
    >
      <template v-slot:avatar="{ row }">
        <el-avatar :size="40" :src="row.avatar"></el-avatar>
      </template>
      <template v-slot:operation>
        <el-button type="text">查看</el-button>
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </template>
      <template v-slot:role="{ row }">
        <div v-if="row.role.length != 0">
          <el-tag type="success" v-for="item in row.role" :key="item.key">{{
            item.title
          }}</el-tag>
        </div>
      </template>
      <template v-slot:openTime="{ row }">
        <div>
          {{ $filters.dateFilter(row.openTime) }}
        </div>
      </template>
    </ProTable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ProTable from '@/components/ProTable'
import { getUserManageList } from '@/api/user'
const columns = ref([
  {
    label: '用户名',
    key: 'username'
  },
  {
    label: '手机号',
    key: 'mobile'
  },
  {
    label: '头像',
    key: 'avatar',
    slot: true
  },
  {
    label: 'role',
    key: 'role',
    slot: true
  },
  {
    label: '时间',
    key: 'openTime',
    slot: true
  },
  {
    label: '操作',
    key: 'operation',
    slot: true
  }
])
const loading = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(0)
const dataSource = ref([])
const pagination = computed(() => {
  return {
    page: page.value,
    size: size.value,
    total: total.value,
    onPageChange: (currentPage) => {
      page.value = currentPage
    },
    onSizeChange: (currentSize) => {
      size.value = currentSize
    }
  }
})
const getData = () => {
  loading.value = true
  getUserManageList({
    page: page.value,
    size: size.value
  })
    .then((res) => {
      loading.value = false
      dataSource.value = res.list
      total.value = res.total
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  getData()
})
watch([page, size], () => {
  getData()
})
</script>

<style lang="scss" scoped>
.user-manage {
}
</style>
