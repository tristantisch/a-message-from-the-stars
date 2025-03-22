<script setup lang="ts">
import CodeSlot from './components/CodeSlot.vue';
import LetterGrid from './components/LetterGrid.vue';
import HintBar from './components/HintBar.vue';
import { useCodeStore } from './services/code-store';
import { storeToRefs } from 'pinia';

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
