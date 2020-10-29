import { GetterTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { RequestsState } from "@/store/modules/requests/index.ts";

const getters: GetterTree<RequestsState, StoreState> = {
  requests: ({ requests }, getters, rootState, rootGetters) =>
    requests.filter(request => request.coachId === rootGetters["auth/userId"]),
  hasRequests: ({ requests }) => !!requests && requests.length > 0
};

export default getters;
