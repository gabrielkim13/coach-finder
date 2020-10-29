import { createStore } from "vuex";

import auth from "@/store/modules/auth";
import coaches from "@/store/modules/coaches";
import requests from "@/store/modules/requests";

export type StoreState = {};

export default createStore<StoreState>({
  modules: {
    auth,
    coaches,
    requests
  }
});
