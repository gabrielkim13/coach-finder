import { createStore } from "vuex";

import auth from "@/store/modules/auth";
import coaches from "@/store/modules/coaches";
import requests from "@/store/modules/requests";

export interface StoreState {
  userId: string;
}

export default createStore<StoreState>({
  state: () => ({
    userId: "c3"
  }),

  getters: {
    userId: ({ userId }) => userId
  },

  modules: {
    auth,
    coaches,
    requests
  }
});
