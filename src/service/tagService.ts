import axios, { AxiosError } from "axios";
import { errorHandler } from "./handleError";

let instance = axios.create({
    baseURL: "api/tags",
    headers: {Accept: "application/json"},
    timeout: 1000

})
export async function getTags(): Promise<string[]> {
    try {
        const { data } = await instance.get("/");
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}