<script setup lang="ts">
import { useDark } from '@vueuse/core';
import Moon from '../assets/moon.svg';
import Sun from '../assets/sun.svg';


const isDark = useDark();
const toggleTheme = () => {
    isDark.value = !isDark.value;
};
</script>

<template>
    <div id="theme-switcher">
        <button @click="toggleTheme">
            <Sun 
                v-if="isDark"
                class="icon" 
            />
            <Moon 
                v-else 
                class="icon" 
            />
        </button>
    </div>
</template>

<style scoped lang="scss">
#theme-switcher {
    position: fixed;
    right: 20px;
    top: 80px;
    margin-bottom: 20px;
    z-index: 100;

    button {
        background-color: var(--color-gray-100);
        color: var(--text);
        font-size: 10px;
        padding: 10px;
        border: 1px solid var(--text);
        cursor: pointer;
        outline: none;
        width: 50px;
        height: 50px;

        .icon {
            width: 100%;
            height: 100%;
            stroke: red;
            stroke-width: 2;
        }
    }
}
</style>