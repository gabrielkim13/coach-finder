import { MutationTree } from "vuex";

import { Coach, CoachesState } from "@/store/modules/coaches/index.ts";

const mutations: MutationTree<CoachesState> = {
  registerCoach: ({ coaches }, payload: Coach) => {
    console.log("oi");

    coaches.push(payload);
  }
};

export default mutations;
