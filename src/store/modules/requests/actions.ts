import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { Request, RequestsState } from "@/store/modules/requests/index.ts";

import { ContactCoachFormData } from "@/views/requests/ContactCoach.vue";

const actions: ActionTree<RequestsState, StoreState> = {
  addRequest: ({ commit }, data: ContactCoachFormData) => {
    const request = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      userEmail: data.email,
      message: data.message
    } as Request;

    commit("addRequest", request);
  }
};

export default actions;
