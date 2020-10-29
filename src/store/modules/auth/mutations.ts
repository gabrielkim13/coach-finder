import { MutationTree } from "vuex";

import { AuthState } from "@/store/modules/auth/index.ts";

const mutations: MutationTree<AuthState> = {
  setUser: (state, payload: AuthState) => (state = { ...payload })
};

export default mutations;
