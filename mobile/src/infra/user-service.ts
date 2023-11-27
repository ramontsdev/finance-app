import { User } from "../models/user";
import { httpClient } from "./http-client";

async function me() {
  const { data } = await httpClient.get<User>('/users/me');

  return data;
}

export const userService = {
  me,
}
