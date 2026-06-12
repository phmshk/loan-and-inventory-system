import type { components, paths } from "./openapi/generated/schema";

export type ApiPaths = paths;
export type ApiSchemas = components["schemas"];

export { fetchClient, rqClient } from "./client";
