import { httpClient } from "./http-client";

type SignInParams = {
  email: string;
  password: string;
}
async function signIn(params: SignInParams) {
  const { data } = await httpClient.post<{ accessToken: string; }>('/auth/sign-in', params);

  return data
}

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

async function signUp(params: SignUpParams) {
  const { data } = await httpClient.post<{ accessToken: string }>('/auth/sign-up', params);

  return data
}

export const authenticationService = {
  signIn,
  signUp
}
