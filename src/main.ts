import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import PiniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from '@/router';
import App from '@/App.vue';
import ThrottleButton from '@/components/ThrottleButton.vue';
import '@/styles/index.less';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';


// 使用pinia持久化插件
const pinia = createPinia();
pinia.use(PiniaPluginPersistedstate);

createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.component('RoButton',ThrottleButton)
.mount('#app');
