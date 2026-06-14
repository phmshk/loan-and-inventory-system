import { CONFIG } from "@/shared/model/config";
import { http, HttpResponse } from "msw";
import { branchesDB } from "../db/branches.db";

export const branchesHandlers = [
  http.get(`${CONFIG.API_BASE_URL}/branches`, () => {
    return HttpResponse.json(branchesDB);
  }),
];
