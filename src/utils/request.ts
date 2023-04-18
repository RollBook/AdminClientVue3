import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { ElMessage } from 'element-plus';
import axios, { AxiosResponse } from 'axios';
import router from '@/router';


// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30 * 1000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  });

// 设置允许跨域
axios.defaults.withCredentials = true;


/** 请求拦截 */
service.interceptors.request.use(
  
  (config) => {
    // pinia
    const sysUserStore = useStore().sysUser;
    const { token } = storeToRefs(sysUserStore);

    if (!config.headers) { throw new Error(`config不能为空`) }
    
    if (config.url === '/sys/login') { return config }

    config.headers["token"] = token.value
    return config
    
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

/** 响应拦截 */
service.interceptors.response.use(
  (response: AxiosResponse<ResRecord<any>>):AxiosResponse<ResRecord<any>>=>{
    
    if(response.status !== 200) {
      ElMessage({
        message:response.data.data,
        type:'error'
      })
    }
    return response;
  },
  (error: any)=>{
    // pinia
    const sysUserStore = useStore().sysUser;
    const { token } = storeToRefs(sysUserStore);
    // router
    // const router = useRouter();

    if(error instanceof Object && error.hasOwnProperty('response')) {
      ElMessage({
        message:error.response.data.msg,
        type:'error'
      });
      if(error.response.status === 401) {
        token.value = '';
        router.push({ path:'/login' });
      }
    }
    return Promise.reject(error);
  }
)

// 导出 axios 实例
export default service;