import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import PiniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from '@/router';
import App from '@/App.vue';
import 'element-plus/dist/index.css';
import '@/styles/index.less';

// 使用pinia持久化插件
const pinia = createPinia();
pinia.use(PiniaPluginPersistedstate);

createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.mount('#app');
