import { Module } from "vuex";

import { StoreState } from "@/store/index.ts";
import getters from "@/store/modules/auth/getters.ts";
import actions from "@/store/modules/auth/actions.ts";
import mutations from "@/store/modules/auth/mutations.ts";

export interface AuthState {
  userId: string;
  token: string;
}

const Authes: Module<AuthState, StoreState> = {
  namespaced: true,

  state: {
    userId: "",
    token: ""
  },

  getters,

  actions,

  mutations
};

export default Authes;
