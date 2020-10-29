import { Module } from "vuex";

import { StoreState } from "@/store/index.ts";
import getters from "@/store/modules/requests/getters.ts";
import actions from "@/store/modules/requests/actions.ts";
import mutations from "@/store/modules/requests/mutations.ts";

export interface Request {
  id: string;
  coachId: string;
  userEmail: string;
  message: string;
}

export interface RequestsState {
  requests: Request[];
}

const coaches: Module<RequestsState, StoreState> = {
  namespaced: true,

  state: {
    requests: []
  },

  getters,

  actions,

  mutations
};

export default coaches;
