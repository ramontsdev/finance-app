import { Category } from "../models/category";
import { httpClient } from "./http-client";

type CategoriesResponse = Array<Category>;

async function loadCategories() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data
}

export const categoriesService = {
  loadCategories,
}
