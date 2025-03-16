<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { type Letter } from '../services/types';
import { LetterNotetakingState, nextState } from './letter-notetaking';

const {letter, allowNotetaking, isCode} = defineProps({
    letter : {
        type: Object as PropType<Letter>,
        required: true,
    },
    allowNotetaking: {
        type: Boolean,
        required: false,
        default: false,
    },
    isCode : {
        type: Boolean,
        required: false,
        default: false,
    },
});
let state = ref(LetterNotetakingState.None);
const changeNotetakingState = () => {
    if (allowNotetaking) {
        state.value = nextState(state.value);
    }
}
</script>

<template>
    <div 
        id="letter"
        :class="{
            [letter.color]: true,
            isCode,
            unselectable: true,
        }"
        @click="changeNotetakingState()"
    >
        <div id="circle" v-if="state === LetterNotetakingState.Circled"></div>
        <div id="cross" v-if="state === LetterNotetakingState.Crossed"></div>
        {{ letter.character }}
    </div>  
</template>

<!-- TODO: Define color constants somwhere central -->
<style scoped>
#letter {
    height: var(--letter-size);
    width: var(--letter-size);

    font-size: 24pt;
    align-content: center;
    position: relative;

    border: 1px solid white;
    &.grey {
        background-color: grey;
    }
    &.green {
        background-color: green;
    }
    &.red {
        background-color: red;
    }
    &.isCode {
        height: var(--letter-size-code);
        width: var(--letter-size-code);
        font-size: 30pt;
    }
}
#circle {
    --circle-size: calc(0.7 * var(--letter-size));
    --border-size: 2px;
    height: var(--circle-size);
    width: var(--circle-size);
    border: var(--border-size) solid white;
    border-radius: calc(var(--circle-size) / 2 + var(--border-size));
    position: absolute;
    top: calc((var(--letter-size) - var(--circle-size)) / 2 - var(--border-size));
    left: calc((var(--letter-size) - var(--circle-size)) / 2 - var(--border-size));
}

#cross {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--letter-size);
    width: var(--letter-size);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#cross::before,
#cross::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px; /* cross thickness */
    background-color: white;
}
#cross::before {
    transform: rotate(45deg);
}
#cross::after {
    transform: rotate(-45deg);
}
</style>
