import { ActionTree } from "vuex";

import { StoreState } from "@/store/index.ts";
import { AuthState } from "@/store/modules/auth/index.ts";

import { identityApi } from "@/services";

export interface IdentitySigninResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

export interface IdentitySignupResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

const actions: ActionTree<AuthState, StoreState> = {
  login: async (
    { commit },
    { email, password }: { email: string; password: string }
  ) => {
    try {
      const loginData = {
        email,
        password,
        returnSecureToken: true
      };

      const response = await identityApi.post<IdentitySigninResponse>(
        "/accounts:signInWithPassword",
        loginData
      );

      const { localId, idToken, expiresIn } = response.data;

      const authState = {
        userId: localId,
        token: idToken,
        tokenExpiration: parseInt(expiresIn)
      } as AuthState;

      commit("setUser", authState);
    } catch (err) {
      throw new Error("Error signing up.");
    }
  },
  signup: async (
    { commit },
    { email, password }: { email: string; password: string }
  ) => {
    try {
      const signupData = {
        email,
        password,
        returnSecureToken: true
      };

      const response = await identityApi.post<IdentitySignupResponse>(
        "/accounts:signUp",
        signupData
      );

      const { localId, idToken, expiresIn } = response.data;

      const authState = {
        userId: localId,
        token: idToken,
        tokenExpiration: parseInt(expiresIn)
      } as AuthState;

      commit("setUser", authState);
    } catch (err) {
      throw new Error("Error signing up.");
    }
  },
  logout({ commit }) {
    commit("setUser", {
      userId: "",
      token: "",
      tokenExpiration: 0
    } as AuthState);
  }
};

export default actions;
