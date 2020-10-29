import { MutationTree } from "vuex";

import { Request, RequestsState } from "@/store/modules/requests/index.ts";

const mutations: MutationTree<RequestsState> = {
  addRequest: ({ requests }, payload: Request) => {
    requests.push(payload);
  }
};

export default mutations;
