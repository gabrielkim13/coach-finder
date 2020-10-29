import { MutationTree } from "vuex";

import { Request, RequestsState } from "@/store/modules/requests/index.ts";

const mutations: MutationTree<RequestsState> = {
  addRequest: ({ requests }, payload: Request) => {
    requests.push(payload);
  },
  setRequests: (state, payload: Request[]) => (state.requests = payload)
};

export default mutations;
