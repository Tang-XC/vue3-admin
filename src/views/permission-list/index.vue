<template>
  <div class="">
    <ProTable
      :columns="columns"
      :loading="loading"
      :dataSource="dataSource"
      :pagination="pagination"
      :isExpand="true"
    >
    </ProTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ProTable from '@/components/ProTable'
import { getPermissionList } from '@/api/user'
const columns = ref([
  {
    label: '权限名称',
    key: 'permissionName'
  },
  {
    label: '权限标识',
    key: 'permissionMark'
  },
  {
    label: '权限描述',
    key: 'permissionDesc'
  }
])
const dataSource = ref([])
const loading = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(0)
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
  getPermissionList()
    .then((res) => {
      dataSource.value = res
      total.value = res.length
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
