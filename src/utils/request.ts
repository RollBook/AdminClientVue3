import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  });
  

//TODO: 请求拦截

//TODO: 响应拦截

// 导出 axios 实例
export default service;