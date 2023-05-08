<template>
  <div id="book-list-container">
    <Breadcrumb bread-route="用户列表" />

    <CustomTable
      :default-method="getUserList"
      :search-method="getUserListByName"
      class="custom-table"
    >
      <el-table-column prop="openId" show-overflow-tooltip label="ID" />
      <el-table-column prop="nickName" show-overflow-tooltip label="用户名" />
      <el-table-column prop="school" label="学校" />
            <el-table-column sortable="custom" label="注册时间">
        <template #default="scope">
          <span v-if="scope.row.createdTime != null">
            {{ dayjs(scope.row.createdTime).format("YYYY-MM-DD HH:mm:ss") }}
          </span></template
        >
      </el-table-column>
      <el-table-column prop="phone" label="电话号码" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="address" label="地址" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope" class="but">
          <el-button @click="recycle(scope.row.userId)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomTable from "@/components/CustomTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getUserList,getUserListByName } from "@/api/user";
import router from "@/router";
import dayjs from "dayjs";
import { ElMessage } from 'element-plus';
import { inject } from 'vue'

const reload = inject('reload');

async function recycle(e){
    const ret = await recycleAudit(e);
    
    if (await ret.status === 200) {
        reload();
        ElMessage({
            message: `回收成功`,
             type: 'success'
        });
    }  
    
    
}


</script>

<style lang="less">
#book-list-container {
  height: 100%;

  .custom-table {
    height: calc(100% - 65px);
  }
}
</style>