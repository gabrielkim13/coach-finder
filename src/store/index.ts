import { createStore } from "vuex";

import coaches, { CoachesState } from "@/store/modules/coaches/index.ts";

export type StoreState = CoachesState;

export default createStore({
  modules: {
    coaches
  }
});
