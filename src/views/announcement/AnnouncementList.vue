<template>
  <div id="book-list-container">
    <Breadcrumb bread-route="公告列表" />

    <CustomTable
      :default-method="getAnnouncementList"
      :search-method="getAnnouncementByLocation"
      class="custom-table"
    >
      <el-table-column prop="location" show-overflow-tooltip width="120px" label="位置" />
      <el-table-column prop="value" show-overflow-tooltip label="内容" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope" class="but">
          <el-button @click="showUpdate(scope.row)" size="small">修改</el-button>
        </template>
      </el-table-column>
    </CustomTable>

    <!-- 修改信息 -->
    <div class="update-box" v-if="isUpdate">
      <el-form label-position="left" label-width="80px" :model="announcement">
        <el-form-item label="位置">
          <el-input v-model="announcement.location" disabled></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="announcement.value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="revise">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CustomTable from "@/components/CustomTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getAnnouncementList,getAnnouncementByLocation,reviseAnnouncement } from "@/api/Announcement";
import router from "@/router";
import dayjs from "dayjs";
import { ElMessage } from 'element-plus';
import { inject } from 'vue';


const reload = inject('reload');

const isUpdate = ref(false);

const announcement = reactive({
  location:"123",
  value:"23"
})

function showUpdate(e){
  isUpdate.value = !isUpdate.value;
  announcement.location = e.location;
  announcement.value = e.value;
}

async function revise(){
    isUpdate.value = !isUpdate.value;
    const ret = await reviseAnnouncement(announcement);
    
    if (await ret.status === 200) {
        reload();
        ElMessage({
            message: `修改成功`,
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

    .update-box {
    position: absolute;
    background-color: #1e1e1f;
    box-shadow: 0 0 1.3rem #aaa;
    padding-top: 3.5rem;
    padding-left: 3.5rem;
    padding-right: 3.5rem;
    padding-bottom: 2rem;
    border-radius: 1rem;
    width: 25rem;
    height: 15rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 4rem;
    z-index: 10;
  }
}

</style>