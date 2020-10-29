import { Module } from "vuex";

import { StoreState } from "@/store/index.ts";
import getters from "@/store/modules/coaches/getters.ts";
import actions from "@/store/modules/coaches/actions.ts";
import mutations from "@/store/modules/coaches/mutations.ts";

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Array<"frontend" | "backend" | "career">;
  description: string;
  hourlyRate: number;
}

export interface CoachesState {
  coaches: Coach[];
}

const coaches: Module<CoachesState, StoreState> = {
  namespaced: true,

  state: {
    coaches: [
      {
        id: "c1",
        firstName: "Maximilian",
        lastName: "Schwarzmüller",
        areas: ["frontend", "backend", "career"],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: "c2",
        firstName: "Julie",
        lastName: "Jones",
        areas: ["frontend", "career"],
        description:
          "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
        hourlyRate: 30
      }
    ]
  },

  getters,

  actions,

  mutations
};

export default coaches;
