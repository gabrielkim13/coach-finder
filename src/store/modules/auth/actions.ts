import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { AuthState } from "@/store/modules/auth/index.ts";

import { identityApi } from "@/services";

export interface IdentityResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

const actions: ActionTree<AuthState, StoreState> = {
  authenticate: async (
    { commit },
    {
      action,
      email,
      password
    }: {
      action: "login" | "signup";
      email: string;
      password: string;
    }
  ) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    const url = action === "login" ? "signInWithPassword" : "signUp";

    const response = await identityApi.post<IdentityResponse>(
      `/accounts:${url}`,
      authData
    );

    const { localId, idToken, expiresIn } = response.data;

    const currentTimestamp = new Date().getTime();
    const expiresInMs = 1000 * parseInt(expiresIn);

    const tokenExpiration = currentTimestamp + expiresInMs;

    const authState = {
      userId: localId,
      token: idToken
    } as AuthState;

    commit("setUser", authState);

    localStorage.setItem("CoachFinder@userId", localId);
    localStorage.setItem("CoachFinder@token", idToken);
    localStorage.setItem(
      "CoachFinder@tokenExpiration",
      tokenExpiration.toString()
    );
  },

  tryLogin: ({ commit, dispatch }) => {
    const userId = localStorage.getItem("CoachFinder@userId");
    const token = localStorage.getItem("CoachFinder@token");

    if (!userId || !token) return;

    const tokenExpiration = localStorage.getItem("CoachFinder@tokenExpiration");

    if (!tokenExpiration || parseInt(tokenExpiration) < new Date().getTime()) {
      dispatch("logout");

      return;
    }

    commit("setUser", { userId, token } as AuthState);
  },

  login: async (
    { dispatch },
    { email, password }: { email: string; password: string }
  ) => {
    try {
      return dispatch("authenticate", { action: "login", email, password });
    } catch (err) {
      throw new Error("Error logging in.");
    }
  },

  signup: async (
    { dispatch },
    { email, password }: { email: string; password: string }
  ) => {
    try {
      return dispatch("authenticate", { action: "signup", email, password });
    } catch (err) {
      throw new Error("Error signing up.");
    }
  },

  logout({ commit }) {
    commit("setUser", {
      userId: "",
      token: ""
    } as AuthState);

    localStorage.removeItem("CoachFinder@userId");
    localStorage.removeItem("CoachFinder@token");
    localStorage.removeItem("CoachFinder@tokenExpiration");
  }
};

export default actions;
