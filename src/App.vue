<template>
  <router-view v-if="isRouteAlive" />
</template>

<script setup lang="ts">
// TODO: 导入语言包
import { nextTick, provide, ref } from 'vue';
import {useRoute} from 'vue-router';

const isRouteAlive = ref(true);

const reload = function() {
    isRouteAlive.value = false;
    nextTick(function(){
      isRouteAlive.value = true;
    })
}

// 暴露重载页面方法
provide('reload',reload);

</script>

<style lang="less" scoped>


</style>
