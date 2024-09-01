import axios, { AxiosError } from "axios";
import { createApiError } from "./errorHandler";
import { TTag } from "../types/Tag";

const instance = axios.create({
  baseURL: "/api/articles",
  headers: { Accept: "application/json" },
  timeout: 1000,
});
export async function getTags(): Promise<string[]> {
  try {
    const { data }: { data: TTag[] } = await instance.get("/global/tags");

    const tagList = data.map((tag) => {
      return tag.name;
    });
    return tagList;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function getTagsOf({ slug }: { slug: string }): Promise<string[]> {
  try {
    const { data }: { data: TTag[] } = await instance.get(`/tags/${slug}`);

    const tagList = data.map((tag) => {
      return tag.name;
    });
    return tagList;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}
