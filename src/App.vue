<script setup lang="ts">
import CodeSlot from './code/CodeSlot.vue';
import LetterGrid from './letter/LetterGrid.vue';
import HintBar from './hint/HintBar.vue';
import { useCodeStore } from './code/code-store';
import { storeToRefs } from 'pinia';

if (import.meta.env.PROD) {
  window.onbeforeunload = () => {
    return 'Are you sure you want to leave? Your progress will be lost.';
  };
}

const codeStore = useCodeStore();
const {code} = storeToRefs(codeStore);
</script>

<template>
  <div id="letterGrids">
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="index in [0, 1, 2]"
            :index="index"
        />
      </div>
    </LetterGrid>
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="index in [3, 4]"
            :index="index"
        />
      </div>
    </LetterGrid>
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="index in [5]"
            :index="index"
        />
      </div>
    </LetterGrid>
  </div>
  <HintBar :code="code"/>
</template>

<style scoped>
#codeSlots {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
#letterGrids {
  display: flex;
}
</style>
