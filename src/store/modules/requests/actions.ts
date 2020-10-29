import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { Request, RequestsState } from "@/store/modules/requests/index.ts";

import { ContactCoachFormData } from "@/views/requests/ContactCoach.vue";

import api from "@/services";

interface FirebaseRequests {
  [key: string]: {
    coachId: string;
    message: string;
    userEmail: string;
  };
}

const actions: ActionTree<RequestsState, StoreState> = {
  addRequest: async ({ commit }, data: ContactCoachFormData) => {
    const request = {
      coachId: data.coachId,
      userEmail: data.email,
      message: data.message
    } as Request;

    try {
      const response = await api.post<{ name: string }>(
        `/requests/${data.coachId}.json`,
        request
      );

      console.log(response.data);

      request.id = response.data.name;

      commit("addRequest", response.data);
    } catch (err) {
      throw new Error("Error sending request.");
    }
  },
  loadRequests: async ({ rootGetters, commit }) => {
    const params = {
      params: {
        auth: rootGetters["auth/token"]
      }
    };

    try {
      const response = await api.get<FirebaseRequests>(
        `/requests/${rootGetters["auth/userId"]}.json`,
        params
      );

      const requests = [];
      const firebaseRequests = response.data;

      for (const requestId in firebaseRequests) {
        const requestObject = {
          id: requestId,
          coachId: firebaseRequests[requestId].coachId,
          message: firebaseRequests[requestId].message,
          userEmail: firebaseRequests[requestId].userEmail
        } as Request;

        requests.push(requestObject);
      }

      commit("setRequests", requests);
    } catch (err) {
      throw new Error("Error loading requests.");
    }
  }
};

export default actions;
