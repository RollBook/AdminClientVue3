<template>
    <el-button
    @click="onClick" 
    :color="props.color"
    :size="props.size"
    :type="props.type"
    :plain="props.plain"
    :round="props.round"
    :icon="props.icon"
    :loading="disabled">
        <slot></slot>
    </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/** 自定义节流按钮 */

// 组件属性
const props = defineProps<{
    // 节流延时
    delay: number,
    size?: 'large'| 'default'| 'small',
    type?: 'primary'| 'success'| 'warning'| 'danger'| 'info',
    plain?: boolean,
    round?:boolean,
    color?: string,
    icon?:string
}>();

// 定义确认事件
const emit = defineEmits(['click']);

// 节流函数
const disabled = ref(false);
const onClick = () => {
    if (!disabled.value) {
        disabled.value = true;
        setTimeout(() => {
            disabled.value = false;
        }, props.delay)
        emit('click');
    }
}

</script>
