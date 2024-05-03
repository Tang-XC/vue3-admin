<template>
  <div class="">
    <ProTable
      :columns="columns"
      :loading="loading"
      :dataSource="dataSource"
      :pagination="pagination"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ProTable from '@/components/ProTable'
import { getRoleList } from '@/api/user'
const columns = ref([
  {
    label: '角色名称',
    key: 'title'
  },
  {
    label: '角色描述',
    key: 'describe'
  },
  {
    label: '操作',
    key: 'action'
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
  getRoleList()
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
