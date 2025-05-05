import { reactive } from 'vue';

export const store = reactive({
  showLandingElements: true,
  toggleLandingElements(show) {
    this.showLandingElements = show;
  }
});