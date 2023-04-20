<template>
    <Breadcrumb bread-route="书本列表" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { getBookList } from '@/api/book';

onMounted(async()=>{
    console.log((await getBookList(1,5)).data);
    
})

</script>

<style lang="less">

</style>