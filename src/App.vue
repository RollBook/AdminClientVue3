<template>
  <router-view :key="useRoute().fullPath" />
</template>

<script setup lang="ts">
// TODO: 导入语言包
import {useRoute} from 'vue-router';


</script>

<style lang="less" scoped>


</style>
