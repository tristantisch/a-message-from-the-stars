<script setup lang="ts">
import { computed, type PropType } from 'vue';
import LetterComponent from './LetterComponent.vue';
import { Color, type Letter } from '../services/types';

const {colorRequirement, letter} = defineProps({
    colorRequirement: {
        type: Array<Color>,
        required: true,
    },
    letter : {
        type: Object as PropType<Letter>,
        required: true,
    },
});

const colorKeys = computed(() => Object.keys(Color).filter(key => isNaN(Number(key))) as (keyof typeof Color)[]);
</script>

<template>
    <div id="codeSlot">
        <div id="colorIndicators">
            <div
                v-for="colorKey in colorKeys"
                :key="colorKey"
                id="colorIndicator"
                :class="{
                    [colorKey.toLowerCase()]: true,
                    filled: colorRequirement.includes(Color[colorKey]),
                }"
            ></div>
        </div>
        <LetterComponent 
            :letter="letter"
            isCode
        />
    </div>      
</template>

<style scoped lang="scss">
#codeSlot {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
#colorIndicators {
    display: flex;
    flex-direction: column;
}
#colorIndicator {
    width: 28px;
    height: 28px;
    border: solid 1px white;

    &.filled {
        &.grey {
            background-color: grey;
        }
        &.green {
            background-color: green;
        }
        &.red {
            background-color: red;
        }
    }
}
</style>
