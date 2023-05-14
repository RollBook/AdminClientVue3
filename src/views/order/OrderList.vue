<template>
  <div id="book-list-container">
    <Breadcrumb bread-route="订单列表" />

    <CustomTable
      :default-method="getOrderList"
      :search-method="getOrderByName"
      class="custom-table"
    >
      <el-table-column prop="orderId" show-overflow-tooltip label="订单号" />
      <el-table-column show-overflow-tooltip sortable="custom" label="订单时间" >
        <template #default="scope">
          <span v-if="scope.row.createdTime != null">
            {{ dayjs(scope.row.createdTime).format("YYYY-MM-DD HH:mm:ss") }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="book.bookName" show-overflow-tooltip label="书本名称" />
      <el-table-column sortable="custom" prop="book.price" label="书本价格" />
      <el-table-column prop="book.pressId" label="出版社id" />
      <el-table-column prop="book.status" label="书本状态" />
      <el-table-column prop="book.tagId" label="标签ID" />
      <el-table-column label="封面" align="center">
        <template #default="scope" #reference>
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.book.url1" style="height: 50px" />
            </template>
            <img :src="scope.row.book.url1" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="背面" align="center">
        <template #default="scope">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.book.url2" style="height: 50px" />
            </template>
            <img :src="scope.row.book.url2" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="扉页" align="center">
        <template #default="scope">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>
              <img :src="scope.row.book.url2" style="height: 50px" />
            </template>
            <img :src="scope.row.book.url2" style="width: 150px; height: 150px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="book.description"
        show-overflow-tooltip
        label="书本描述"
      />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope" class="but">
          <el-button @click="del(scope.row.orderId)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomTable from "@/components/CustomTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getOrderList,getOrderByName,delOrder } from "@/api/order";
import router from "@/router";
import dayjs from "dayjs";
import { ElMessage } from 'element-plus';
import { inject } from 'vue'

const reload = inject('reload');


async function del(e){
    const ret = await delOrder(e);
    
    if (await ret.status === 200) {
        reload();
        ElMessage({
            message: `删除成功`,
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