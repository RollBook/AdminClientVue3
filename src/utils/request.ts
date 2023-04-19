import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import axios, { AxiosResponse } from 'axios';
import useStore from '@/store';
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
    if (config.url === '/sys/login') { return config }

    // pinia
    const sysUserStore = useStore().sysUser;
    const { token } = storeToRefs(sysUserStore);

    if (!config.headers) { throw new Error(`config不能为空`) }

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

    if(error instanceof Object && error.hasOwnProperty('response')) {
      if(error.response.status === 401) {
        router.push('/login');
        ElMessage({
          message:'认证失败',
          type:'error'
        })
      }
      return error.response;
    }

  }
)

// 导出 axios 实例
export default service;