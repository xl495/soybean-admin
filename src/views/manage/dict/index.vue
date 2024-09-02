<script setup lang="tsx">
import DictList from './dict-list.vue';
import DictDetail from './dict-detail.vue';
</script>

<template>
  <div class="min-h-600px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NFlex justify="space-between">
      <DictList />
      <DictDetail />
    </NFlex>
  </div>
</template>
