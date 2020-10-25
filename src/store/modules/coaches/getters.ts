import { GetterTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { CoachesState } from "@/store/modules/coaches/index.ts";

const getters: GetterTree<CoachesState, StoreState> = {
  coaches: ({ coaches }) => coaches,
  hasCoaches: ({ coaches }) => !!coaches && coaches.length > 0
};

export default getters;
