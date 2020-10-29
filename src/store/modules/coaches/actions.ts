import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { Coach, CoachesState } from "@/store/modules/coaches/index.ts";

import { CoachFormData } from "@/components/coaches/CoachForm.vue";

const actions: ActionTree<CoachesState, StoreState> = {
  registerCoach: ({ rootGetters: { userId }, commit }, data: CoachFormData) => {
    const coach = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    } as Coach;

    commit("registerCoach", coach);
  }
};

export default actions;
