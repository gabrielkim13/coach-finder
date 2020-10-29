import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { Coach, CoachesState } from "@/store/modules/coaches/index.ts";

import { CoachFormData } from "@/components/coaches/CoachForm.vue";

import api from "@/services";

interface FirebaseCoaches {
  [key: string]: {
    firstName: string;
    lastName: string;
    description: string;
    hourlyRate: number;
    areas: Array<"frontend" | "backend" | "career">;
  };
}

const actions: ActionTree<CoachesState, StoreState> = {
  registerCoach: async ({ rootGetters, commit }, data: CoachFormData) => {
    const coachId = rootGetters["auth/userId"];

    const coach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    } as Coach;

    const params = {
      params: {
        auth: rootGetters["auth/token"]
      }
    };

    try {
      await api.put(`/coaches/${coachId}.json`, coach, params);

      commit("registerCoach", { ...coach, id: coachId });
    } catch (err) {
      throw new Error("Error on coach registration.");
    }
  },
  loadCoaches: async ({ getters, commit }, data: { forceUpdate: boolean }) => {
    const isForceUpdate = !!data && data.forceUpdate;

    if (!isForceUpdate && !getters.shouldUpdate) return;

    try {
      const response = await api.get<FirebaseCoaches>("/coaches.json");

      const coaches = [];
      const firebaseCoaches = response.data;

      for (const coachId in firebaseCoaches) {
        const coachObject = {
          id: coachId,
          firstName: firebaseCoaches[coachId].firstName,
          lastName: firebaseCoaches[coachId].lastName,
          description: firebaseCoaches[coachId].description,
          hourlyRate: firebaseCoaches[coachId].hourlyRate,
          areas: firebaseCoaches[coachId].areas
        } as Coach;

        coaches.push(coachObject);
      }

      commit("setCoaches", coaches);
      commit("setFetchTimestamp");
    } catch (err) {
      throw new Error("Error loading coaches.");
    }
  }
};

export default actions;
