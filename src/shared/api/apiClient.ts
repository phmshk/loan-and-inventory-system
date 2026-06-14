import createClient from "openapi-fetch";
import type { paths } from "./openapi/generated/schema";
import { CONFIG } from "../model/config";

export const api = createClient<paths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
