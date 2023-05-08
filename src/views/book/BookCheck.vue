<template>
  <div id="book-list-container">
    <Breadcrumb bread-route="书本审核" />

    <CustomTable
      :default-method="getAuditBookList"
      :search-method="getAuditBookByName"
      class="custom-table"
    >
      <el-table-column prop="bookId" show-overflow-tooltip label="ID" />
      <el-table-column prop="openId" show-overflow-tooltip label="openID" />
      <el-table-column prop="bookName" show-overflow-tooltip label="书本名称" />
      <el-table-column sortable="custom" prop="price" label="书本价格" />
      <el-table-column prop="pressId" label="出版社id" />
      <el-table-column prop="status" label="书本状态" />
      <el-table-column prop="audit" label="审核状态" />
      <el-table-column prop="tagId" label="标签ID" />
      <el-table-column label="封面" align="center">
        <template #default="scope" #reference>
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.url1" style="height: 50px" />
            </template>
            <img :src="scope.row.url1" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="背面" align="center">
        <template #default="scope">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.url2" style="height: 50px" />
            </template>
            <img :src="scope.row.url2" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="扉页" align="center">
        <template #default="scope">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.url2" style="height: 50px" />
            </template>
            <img :src="scope.row.url2" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        show-overflow-tooltip
        label="书本描述"
      />
      <el-table-column sortable="custom" label="时间">
        <template #default="scope">
          <span v-if="scope.row.timestamp != null">
            {{ dayjs(scope.row.timestamp).format("YYYY-MM-DD HH:mm:ss") }}
          </span></template
        >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope" class="but">
          <el-button @click="pass(scope.row.bookId)" size="small">通过</el-button>
          <el-button @click="noPass(scope.row.bookId)" size="small">退回</el-button>
        </template>
      </el-table-column>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomTable from "@/components/CustomTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getAuditBookList, getAuditBookByName,passAudit,noPassAudit } from "@/api/book";
import type { Book } from "@/api/book/types";
import router from "@/router";
import dayjs from "dayjs";
import { ElMessage } from 'element-plus';
import { inject } from 'vue'

const reload = inject('reload');

async function pass(e){
    const ret = await passAudit(e);
    
    if (await ret.status === 200) {
        reload();
        ElMessage({
            message: `审核通过`,
             type: 'success'
        });
    }  
    
    
}

async function noPass(e){
        const ret = await noPassAudit(e);
    
    if (await ret.status === 200) {
        reload();
        ElMessage({
            message: `退回书本成功`,
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