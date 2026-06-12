import { http, HttpResponse } from "msw";
import { usersDB } from "../db/users.db";
import { branchesDB } from "../db/branches.db";
import { CONFIG } from "@/shared/model/config";

export const authHandlers = [
  http.post(`${CONFIG.API_BASE_URL}/auth/login`, async ({ request }) => {
    const { username } = (await request.json()) as { username: string };
    const user = usersDB.find((u) => u.username === username);

    if (!user) {
      return HttpResponse.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(user);
  }),

  http.get(`${CONFIG.API_BASE_URL}/auth/me`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const user = usersDB.find((u) => u.id === id);

    if (!user) {
      if (!user) {
        return HttpResponse.json(
          {
            message: "Unauthorized",
          },
          { status: 401 },
        );
      }
    }

    return HttpResponse.json(user);
  }),

  http.get(`${CONFIG.API_BASE_URL}/branches`, () => {
    return HttpResponse.json(branchesDB);
  }),
];
