import { MutationTree } from "vuex";

import { Coach, CoachesState } from "@/store/modules/coaches/index.ts";

const mutations: MutationTree<CoachesState> = {
  registerCoach: ({ coaches }, payload: Coach) => {
    coaches.push(payload);
  },
  setCoaches: (state, payload: Coach[]) => {
    state.coaches = payload;
  }
};

export default mutations;
