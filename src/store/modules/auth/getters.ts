import { GetterTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { AuthState } from "@/store/modules/auth/index.ts";

const getters: GetterTree<AuthState, StoreState> = {
  userId: ({ userId }) => userId,
  token: ({ token }) => token
};

export default getters;
