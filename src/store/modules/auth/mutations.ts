import { MutationTree } from "vuex";

import { AuthState } from "@/store/modules/auth/index.ts";

const mutations: MutationTree<AuthState> = {
  setUser: (state, payload: AuthState) => {
    state.userId = payload.userId;
    state.token = payload.token;
  }
};

export default mutations;
