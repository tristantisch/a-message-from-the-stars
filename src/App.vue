<script setup lang="ts">
import CodeSlot from './code/CodeSlot.vue';
import LetterGrid from './letter/LetterGrid.vue';
import HintBar from './hint/HintBar.vue';
import WordGrid from './words/WordGrid.vue';
import LanguageSwitcher from './language/LanguageSwitcher.vue';
import ThemeSwitcher from './theme/ThemeSwitcher.vue';
import { useCodeStore } from './code/code-store';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from './language/languageStore';

if (import.meta.env.PROD) {
  window.onbeforeunload = () => {
    return 'Are you sure you want to leave? Your progress will be lost.';
  };
}

const languageStore = useLanguageStore();
languageStore.initializeLanguage();
const codeStore = useCodeStore();
const {code} = storeToRefs(codeStore);
</script>

<template>
  <div id="app" theme="light">
    <LanguageSwitcher/>
    <ThemeSwitcher/>
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
    <WordGrid/>
  </div>
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
